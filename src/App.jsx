import { useEffect, useState } from "react";

export default function App() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("/products.json");
            const data = await response.json();
            setProducts(data);
            setFilteredProducts(data);
        };

        fetchProducts();
    }, []);

    const filterProducts = () => {
        let updatedProducts = products;

        if (category !== "All") {
            updatedProducts = updatedProducts.filter(product => 
                product.type === category.toLowerCase());
        }

        if (searchTerm) {
            updatedProducts = updatedProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        setFilteredProducts(updatedProducts);
    };

    return (
        <>
            <header>
                <h1>The Can Store</h1>
            </header>
            <div>
                <aside>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="category">Choose a category:</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option>All</option>
                                <option>Vegetables</option>
                                <option>Meat</option>
                                <option>Soup</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="searchTerm">Enter search term:</label>
                            <input
                                type="text"
                                id="searchTerm"
                                placeholder="e.g. beans"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div>
                            <button type="button" onClick={filterProducts}>Filter results</button>
                        </div>
                    </form>
                </aside>
                <main>
                    {filteredProducts.map((product) => (
                        <section className={product.type} key={product.name}>
                            <h2>{product.name}</h2>
                            <p>${product.price.toFixed(2)}</p>
                            <img src={`icons/${product.image}`} alt={product.name} />
                            <img src={`images/${product.image}`} alt={product.name} />
                        </section>
                    ))}
                </main>
            </div>
            <footer>
                <p>All icons found at the Noun Project:</p>
                <ul>
                    <li>
                        Bean can icon by{" "}
                        <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
                    </li>
                    <li>
                        Vegetable icon by{" "}
                        <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
                    </li>
                    <li>
                        Soup icon by{" "}
                        <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
                    </li>
                    <li>
                        Meat Chunk icon by{" "}
                        <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
                    </li>
                </ul>
            </footer>
        </>
    );
}
