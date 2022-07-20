const getData =async ()=>{
    const url = 'https://api.stackexchange.com/2.3/questions?page=12&order=desc&sort=activity&tagged=backend&site=stackoverflow&key=Hn2Z4Hp0S6PPg70iJ47MqQ((';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.items);
    return data;
}

