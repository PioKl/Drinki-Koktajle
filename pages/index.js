import React, { useState } from 'react';
import { createClient } from 'contentful'; //połączenie z contenful
import DrinkCard from '../components/DrinkCard';


//getStaticProps pobranie danych zanim komponent się wyrenderuje, ta funkcja działa gdy aplikacja jest "budowana (build time)", przed wyrenderowaniem sie komponentu, nie działa ona w przeglądarce, tylko podczas buildu, w tej funkcji nie można zamieścić żadnego kodu, który ma działać w przeglądarce, podczasz użytkowania np. zmienne zwiazane useState. Funkcja getStaticProps uruchamia się w czasie budowania strony (uruchamia sie jako pierwszy, przed wyrenderowaniem komponentu) i przekazuje parametry do podstrony. Kod zawarty tutaj działa po stronie serwera, kod umieszczony w getStaticProps nie jest widoczny dla klienta (client)
export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  }); //odpowiada za połączenie z contentful space, czyli z moim contentful, po podaniu danych

  const response = await client.getEntries({ content_type: 'drink' }); //pobranie danych z contentful space

  return {
    props: {
      drinks: response.items,
      //revalidate: 1//jak często next js ma sprawdzać, czy nastąpiła aktualizacja zawartości, tu np. oznacza, że ma sprawdzać co sekundę
    }
  }
}

export default function Drinks({ drinks }) {

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value)
    setValue(e.target.value);
  }

  console.log(drinks)

  //wyszukiwanie drinka po nazwie
  const searchDrink = drinks.filter(drink => {
    return drink.fields.drinkName.toLocaleLowerCase().includes(value.toLocaleLowerCase())
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
      <input type="text" value={value} onChange={handleChange} />
      {/*       <label>
        Wybierz swój ulubiony smak:
        <select value={value} onChange={handleChange}>
          <option value=""></option>
          {searchDrink.map(drink => (
            <option value={drink.fields.drinkName}>{drink.fields.drinkName}</option>
          ))}
        </select>
      </label> */}
      {searchDrink.map(drink => (
        <DrinkCard key={drink.sys.id} drink={drink} />
      ))}
    </div>
  )
}

