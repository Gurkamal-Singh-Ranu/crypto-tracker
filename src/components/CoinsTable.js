
import { Container, createTheme, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from '../Banner/Carousel';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';

const CoinsTable = () => {
    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(false);
    const [search,setSearch] = useState("");
    const [page,setPage] = useState(1);
    const navigate = useNavigate();
    const {currency , symbol} = CryptoState();

    const fetchCoins = async()=>{
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }
    // console.log(coins);
    useEffect(()=>{
        fetchCoins();
    },[currency]);
    const darkTheme = createTheme({
        palette : {
            primary:{
                main : "#fff",

            },
            mode : "dark", 
        },
        
    })
    const handleSearch = () =>{
        return coins.filter(
            (coin)=>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        );
    }
    
  return (
     <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign: "center"}}>
            <Typography variant='h4' 
            style={{margin:18,fontFamily:"Montserrat"}}>
            CryptoCurrency Prices by Market Cap

            </Typography>
            <TextField label = "Search For a Crypto Currency.." variant='outlined'
                style={{marginBottom:20,width : "100%"}}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete='off'
            />
            <TableContainer>
                {loading? (
                    <LinearProgress style={{backgroundColor : "gold"}}/>
                ):(
                    <Table>
                        <TableHead style={{backgroundColor:"#EEBC1D"}}>
                           <TableRow>
                            {["Coin","Price","24h Change","Market Cap"].map((head)=>(
                                <TableCell style={{color : "black",fontWeight:"700",fontFamily:"Montserrat"}}
                                key={head}
                                
                                align = {head==="Coin"?"left":"right"}
                                // align={if(!head==="Coin") }
                                  
                                >
                                
                                    {head}
                                </TableCell>
                            ))}
                           </TableRow>  
                        </TableHead>
                        <TableBody>
                            {handleSearch()
                            .slice((page-1)*10,(page-1)*10 + 10)
                            .map(row=>{
                                const profit =row.price_change_percentage_24h > 0;
                                return (
                                    <TableRow
                                    // 
                                        onClick = {()=>navigate(`/coins/${row.id}`)}
                                    // 
                                        
                                        style={{backgroundColor:"#16171a", cursor:"pointer",fontFamily:"Montserrat" , }}

                                        // onMouseOver={()=>this.style.backgroundColor='#131111'}

                                        key = {row.name}>
                                        <TableCell component='th' scope='row'
                                        style={{
                                            display: "flex",
                                            gap: 15,
                                        }}>
                                        <img
                                        src={row?.image}
                                        alt= {row.name}
                                        height="50"
                                        style = {{marginBottom:10}}/>
                                        <div
                                        style={{display:"flex",flexDirection: "column"}}>
                                            <span style={{
                                                textTransform: "uppercase",
                                                fontSize:22,
                                            }}>
                                                {row.symbol}
                                            </span>
                                            <span style={{color: "darkgrey"}}>{row.name}</span>
                                        </div>

                                        </TableCell>
                                        <TableCell align='right'
                                        >
                                        {symbol}{" "}
                                        {numberWithCommas( row.current_price.toFixed(2))}

                                        </TableCell>
                                        <TableCell
                                        align='right'
                                        style={{
                                            color: profit>0 ? "green":"red",
                                            fontWeight:500,
                                        }}>
                                        {profit && "+"}
                                        {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell align="right">
                                        {symbol}{" "}
                                        {numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                        </TableCell>
                                    </TableRow>
                                )
                            })}  
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            <Pagination
            style={{padding: 20,width:"100%",display:"flex",justifyContent:"center",color: 'gold'}}
            // 
                count={parseInt((handleSearch()?.length/10).toFixed(0))}
            // 
                onChange = {(_,value)=>{
                    setPage(value);
                    window.scroll(0,450);
                }}
            />
        </Container>
     </ThemeProvider>
  )
}

export default CoinsTable
