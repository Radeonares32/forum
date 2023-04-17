import Neode from 'neode'

export const neo4j = () => {
    try {
        const neo4j = new Neode("bolt://localhost:7687", "neo4j", "neo4j")
        return neo4j
    }
    catch(err) {
        console.error(err)
    }
}