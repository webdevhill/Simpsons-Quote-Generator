const App = () => {
    const [activeQuote, setActiveQuote] = React.useState(0);
    const [quotes, setQuotes] = React.useState([]);
  
    React.useEffect(() => {
      <callToApi>.then(res => setQuotes([...quotes, res.data]))
    }, [activeQuote, quotes])
  
    const onNextButtonClick = () => {
      setActiveQuote(activeQuote + 1)
    }
  
    const onPrevButtonClick = () => {
      setActiveQuote(activeQuote - 1)
    }
  
    return `
      ...
      <button [disabled]={activeQuote === 0}>
      <button onClick={onNextButtonClick}>
    `
  }