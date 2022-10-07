import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";
import ReactTooltip from "react-tooltip";
import { AiFillGold, AiOutlineQuestionCircle } from 'react-icons/ai';
import SelectButton from "../components/SelectButton";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      padding: "0px",
      margin: "10px",
    },
    container_lowerThird: {
      display: "flex",
      width: "100%",
      height: "35px", 
      alignItems: "center",
      padding: "30px 0px 0px 535px"
    },
    text: {
      width: "190px",
      padding: "10px",
      fontWeight: "600",
      fontSize: "20px",
      borderRight: "6px solid gold",
      height: "34px"
    },
    box: {
      display: "inline",
      padding: "0px 40px",
    },
    date: {
      display: "inline",
      color: "rgba(250, 250, 250, 0.8)", 
      margin: "0px 6px"
    },
    buttonSaibaMais: {
      padding: "10px",
      marginTop: "50px",
      marginLeft: "150px",
      position: "absolute",
    },
    indicateText: {
      position: "absolute",
      marginTop: "120px",
      padding: "1px",
      marginLeft: "150px",
    },
    buttonMagic1: {
      position: "absolute",
      marginTop: "190px",
      marginLeft: "100px",
      padding: "1px",
    },
    buttonMagic2: {
      position: "absolute",
      marginTop: "190px",
      marginLeft: "230px",
      padding: "1px",
    },
    hoverQuestion: {
      height: "110px",
      marginLeft: "152px",
      position: "absolute",
      color: "white",
      "&:hover": {
        color: "gold",
      },
    },
    hover: {
      "&:hover": {
        color: "gold",
      },
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.description}>
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography> 
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              <div class={classes.hover} data-tip data-for="rankTip">Rank:</div>

              <ReactTooltip id="rankTip" place="top" effect="solid">
        O Rank da Criptomoeda significa o quão valorizada ela <br></br> 
        é como um ativo em comparação com as demais disponíveis no mercado. <br></br>
      </ReactTooltip>
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
            <div class={classes.hover} data-tip data-for="currentTip">Current Price:</div>

            <ReactTooltip id="currentTip" place="top" effect="solid">
        Current Price ou Preço Atual mostra o valor necessário para se <br></br> 
        adquirir apenas uma criptomoeda. <br></br>
      </ReactTooltip>
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
            <div class={classes.hover} data-tip data-for="marketTip">Market Cap:</div>

            <ReactTooltip id="marketTip" place="top" effect="solid">
            A capitalização de mercado é calculada ao multiplicar o número total de moedas que <br></br> 
            já foram mineradas pelo preço de uma única moeda em um dado momento. <br></br>
            Podemos definir a capitalização de mercado como um indicador da <br></br>
            propensão à estabilidade de um ativo. <br></br> <br></br>
            Entenda melhor clicando no <a>Botão Abaixo</a>
      </ReactTooltip>
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
            <div class={classes.buttonSaibaMais}>
            <a href="https://www.coinbase.com/pt/learn/crypto-basics/what-is-market-cap#:~:text=No%20mundo%20das%20criptomoedas%2C%20a,%C3%A0%20estabilidade%20de%20um%20ativo." 
            target="_blank" rel="noreferrer">
          <SelectButton>Saiba Mais</SelectButton>
        </a>
        </div>
 
        <div class={classes.indicateText}>
        <h1 class={classes.hover} data-tip data-for="titleTip">Indicador</h1>
        <ReactTooltip id="titleTip" place="top" effect="solid">
            O Indicador é o resultado de previsões que mostram qual <br></br> 
            a melhor movimentação a ser feita no momento para a criptomeda em questão. <br></br>
      </ReactTooltip>
      </div>
      <div class={classes.buttonMagic1}>
      <SelectButton>Comprar</SelectButton>
      </div>
      <div class={classes.buttonMagic2}>
      <SelectButton>Vender</SelectButton>
      </div>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
    <div class={classes.container_lowerThird}>

      <div class={classes.hoverQuestion}>
      <AiOutlineQuestionCircle size="30px" data-tip data-for="questionTip"/>
      </div>

      <ReactTooltip id="questionTip" place="top" effect="solid">
        Você sabia que acontecimentos ao redor do planeta podem influenciar nos valores das Criptomoedas? <br></br> <br></br>

        Por isso é importante ficar atento as notícias!! <br></br> <br></br>
        
        <a>Entenda melhor no link!!</a>
      </ReactTooltip>
      <span class={classes.text}>Breaking News</span>
      <marquee behavior="" direction="left">
        <div class={classes.box}>
          <p class={classes.date}>17 Fev 2021</p>
          <a href="https://www.infomoney.com.br/guias/criptomoedas/">Um guia para dar os primeiros passos com as moedas digitais</a>
        </div>
        <div class={classes.box}>
          <p class={classes.date}>18 Nov 2021</p>
          <a href="https://riconnect.rico.com.vc/analises/10-fatos-sobre-bitcoin">10 Fatos sobre Bitcoin antes de investir</a>
        </div>

        <div class={classes.box}>
          <p class={classes.date}>26 May 2021</p>
          <a href="https://www.bbc.com/portuguese/internacional-57238550">Bitcoin: o que explica sobe e desce da criptomoeda, com queda vertiginosa após valorização recorde?</a>
        </div>

      </marquee>
    </div>
    </div>
  );
};

export default CoinPage;
