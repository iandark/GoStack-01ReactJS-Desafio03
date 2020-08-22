import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "./services/api";

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get("repositories").then((response) => {
            setRepositories(response.data);
        });
    }, []);

    async function handleAddRepository() {
        const response = await api.post("repositories", {
            title: `Teste ${Date.now()}`,
            url: "https://github.com/iandark/GoStack-NodeJS",
            techs: ["NodeJS", "Express", "Nodemon"],
        });

        const repository = response.data;
        setRepositories([...repositories, repository]);
    }

    async function handleRemoveRepository(id) {
        api.delete(`repositories/${id}`).then(() =>
            setRepositories(
                repositories.filter((repository) => repository.id !== id)
            )
        );
    }

    return (
        <>
            <button onClick={handleAddRepository}>Adicionar</button>
            <ul data-testid="repository-list">
                {repositories.map(({ id, title }) => (
                    <li key={id}>
                        {title}
                        <button onClick={() => handleRemoveRepository(id)}>
                            Remover
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default App;
