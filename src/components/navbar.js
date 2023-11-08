import Link from 'next/link';
export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/pantry">Pantry</Link>
        </li>
        <li>
          <Link href="/recipeBook">Recipes</Link>
        </li>
        <li>
          <Link href="/mealPlanner">Meals</Link>
        </li>
        <li>
          <Link href="/shoppingList">Lists</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
        <li>
          <Link href="/testIngredients">Test</Link>
        </li>
        <li className='signin'>
          <Link href="/signIn">Sign In</Link>
        </li>    
      </ul>
    </nav>
    
  );
};