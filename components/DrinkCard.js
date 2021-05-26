import Link from 'next/link';

export default function DrinkCard({ drink }) {
    const { drinkName, slug, ingredients, quantities, drinkImage, drinkVideoLink } = drink.fields;

    const youtubeParser = (url) => {
        let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        let match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    return (
        <Link href={`/przepisy/${slug}`}>
            <a className="drink">
                <h1>{drinkName}</h1>
                {ingredients.map((ingredient, id) => (
                    <span key={id}>{ingredient}</span>
                ))}
                {quantities.map((quantity, id) => (
                    <span key={id}>{quantity}</span>
                ))}
                <img src={drinkImage.fields.file.url} width="200px" height="200px" alt="" />
                {/*                 <iframe width="200" height="200" target="_parent"
                    src={`https://www.youtube.com/embed/${youtubeParser(drinkVideoLink)}`}
                /> */}
            </a>
        </Link>
    )
}