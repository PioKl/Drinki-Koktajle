/* Szczegóły klikniętego drinka */
import { createClient } from 'contentful'; //połączenie z contenful

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

//Tworzenie unikalnych sciezek
//getStaticPaths - funkcja, ktora sluży do porozumienia sie z nextem, zeby wiedzial ile stron html musi wygenerować na podstawie danych ( w tym przypadku danych z contentful), na podstawie ilosci slugow
export const getStaticPaths = async () => {

    const response = await client.getEntries({ content_type: "drink" })

    const paths = response.items.map(item => {
        return {
            params: { slug: item.fields.slug }
        }
    })

    return {
        paths,
        fallback: true, //jeśli wpisze ścieżkę, która nie istnieje w paths, to dostane strone 404, jesli fallBack jest ustawiony na false, jesli true to mogę umieścić stronę placeholderową, która się wyświetla zanim wczytają się jakieś dane
    }
}

//ta funkcja będzie uruchamiana tyle razy ile mamy slugów, czyli drinków/koktajli w bazie
export const getStaticProps = async ({ params }) => {
    const { items } = await client.getEntries({
        content_type: 'drink',
        'fields.slug': params.slug
    });

/*    //sposób z response
        const response = await client.getEntries({
        content_type: 'drink',
        'fields.slug': params.slug
    });
 */
    //jeśli nie ma żadnych items to
    if (!items.length) {
        return {
            redirect: {
                destination: '/', //wtedy przekieruj na stronę główną
                permanent: false,
            }
        }
        //czyli podsumowując jeśli nie będzie nic istnieć pod danym linkiem, nie będzie dodany żaden taki drink/koktajl, czyli nie ma takiego adresu, wtedy przekieruj na stronę główną, permanent jest false, bo w przyszłości może być pod tym linkiem jakiś drink
    }
    return {
        props: { drink: items[0], items, reso }, //przekazywany jest tylko pierwszy obiekt z tej tablicy, bo struktura wygląda tak [{}], tablica i jeden obiekt, więc trzeba użyć items[0]
        //revalidate: 1//jak często next js ma sprawdzać, czy nastąpiła aktualizacja zawartości, tu np. oznacza, że ma sprawdzać co sekundę

        //sposób z response
        //props: {drink: response.items[0]}
    }
}

export default function DrinkDetails({ drink }) {

    console.log(drink)
    if (!drink) return <div>Loading</div>

    const { drinkName, slug, ingredients, quantities, drinkImage, drinkVideoLink } = drink.fields;
    return (
        <div>
            Szczegóły
            <h1>Nazwa: {drinkName}</h1>
            <img src={drinkImage.fields.file.url} width="200px" height="200px" alt="" />
        </div>
    )
}
