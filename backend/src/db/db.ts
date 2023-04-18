import Neode from 'neode'

export const neo4j = () => {
    try {
        const neo4j = new Neode("neo4j://localhost:7687", "neo4j", "bugisencokyasa32")
        return neo4j
    }
    catch(err) {
        console.error(err)
    }
}