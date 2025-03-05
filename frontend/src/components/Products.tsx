import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container, Grid, Card, CardContent, Typography, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

interface Product {
    id: string
    name: string
    desc: string
    category: string
    pricing: {
        price_usd: string
        discount: number
    }
    cep: string
    uf: string
}

interface cep {
    cep: string
    logradouro: string
    complemento: string
    unidade: string
    bairro: string
    localidade: string
    uf: string
    estado: string
    regiao: string
    ibge: string
    gia: string
    ddd: string
    siafi: string
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [cep, setCep] = useState('')
    const [cepData, setCepData] = useState<cep>()
    useEffect(() => {
        const fetchProducts = async () => {
            const listProducts = await axios.get('http://localhost:3333/products')
            const productsWithUf = await Promise.all(
                listProducts.data.map(async (product: Product) => {
                    const cepData = await axios.get(`https://viacep.com.br/ws/${product.cep}/json/`)
                    return {
                        ...product,
                        uf: cepData.data.uf
                    }
                })
            )
            setProducts(productsWithUf)
        }
        fetchProducts()
    }, [])
    
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    const handleCep = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCep(event.target.value)
    }
 
    const filteredProducts = products.filter((product) => {
        const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
        const cepMatch = cepData ? product.uf === cepData.uf : true
        return searchMatch && cepMatch
    })

    const handleCepSearch = async () => {
        const cepData = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        setCepData(cepData.data)
    }

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Products
            </Typography>
            <div className="flex gap-4">
                <TextField
                    label="Search"
                    variant="outlined"
                    onChange={handleSearch}
                    margin="normal"
                    value={searchQuery}
                    size='small'
                    
                />
                <TextField
                    label="CEP"
                    variant="outlined"
                    onChange={handleCep}
                    margin="normal"
                    value={cep}
                    size='small'
                    InputProps={{
                        endAdornment: (
                            <button 
                                className="cursor-pointer"
                                onClick={handleCepSearch}
                            >
                                <SearchIcon sx={{color: "gray"}} />
                            </button>
                        ),
                    }}
                />
            </div>
            <Grid container spacing={4}>
                {filteredProducts.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {product.name}
                                </Typography>
                                <Typography color="textSecondary">
                                    {product.desc}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    ${product.pricing.price_usd}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
} 

export default Products