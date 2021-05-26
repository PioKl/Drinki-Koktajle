import { createClient } from 'contentful'; //połączenie z contenful
import DrinkCard from '../components/DrinkCard';

export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  }); //odpowiada za połączenie z contentful space, czyli z moim contentful, po podaniu danych

  const response = await client.getEntries({ content_type: 'drink' }); //pobranie danych z contentful space

  return {
    props: {
      drinks: response.items,
    }
  }
}

export default function Drinks({ drinks }) {

  console.log(drinks)

  //wyszukiwanie drinka po nazwie
  const searchDrink = drinks.filter(drink => {
    return drink.fields.drinkName.includes('Mojito')
  })
  console.log(searchDrink)


  //filtrowanie drinków
  //https://stackoverflow.com/questions/66301241/how-to-filter-an-array-of-nested-objects-javascript
  const ingrFilter = drinks.filter(drink => drink.fields.ingredients.some(ingredient => ingredient === 'woda gazowana'));
  //to jest dobre na jeden filtr, gdyż zwróci te drinki, które mają w sobie składnik woda gazowana, ale jak dodam &&, np. woda gazowana i cola, to jeśli będzie miał tylko wodę gazowaną, a colę nie to i tak go wyświetli
  //recipes.filter(r => r.ingredients.some(i => i.ingredient === enteredValue));
  console.log(ingrFilter)

  const filters = ['woda gazowana'];
  const ingredientsWithFilter = drinks.filter(drink => {
    //https://stackoverflow.com/questions/54837999/specify-multiple-integers-with-javascript-includes
    return filters.every(ingredient => drink.fields.ingredients.includes(ingredient)); //wyswietl te drinki, ktore zawieraja sobie wszystkie składniki z tego co uzytkownik wybral w filters (&&)
  })

  console.log(ingredientsWithFilter)


  return (
    <div className="drinksList">
      {drinks.map(drink => (
        <DrinkCard key={drink.sys.id} drink={drink} />
      ))}
    </div>
  )
}

