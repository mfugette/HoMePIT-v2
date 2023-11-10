import Link from 'next/link';
export default function Navbar() {
  return (
    <nav>
      <ul id="navUl">
        <li className="navLi">
          <Link href="/">Home</Link>
        </li>
        <li className="navLi">
          <Link href="/pantry">Pantry</Link>
        </li>
        <li className="navLi">
          <Link href="/recipeBook">Recipes</Link>
        </li>
        <li className="navLi">
          <Link href="/mealPlanner">Meals</Link>
        </li>
        <li className="navLi">
          <Link href="/shoppingList">Lists</Link>
        </li>
        <li className="navLi">
          <Link href="/settings">Settings</Link>
        </li>
        <li className="navLi">
          <Link href="/testIngredients">Test</Link>
        </li>
        {/* <li className='signin'>
          <Link href="/signIn">Sign In</Link>
        </li> */}
      </ul>
    </nav>

  );
};