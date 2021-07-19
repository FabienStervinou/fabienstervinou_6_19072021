import Factory from './js/factory';

const getData = async function () {
  let response = await fetch('./data.json');
  if (response.ok) {
    let data = await response.json();
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      console.log(new Factory(element));
    }    
    console.log('Data : ', data);
  } else {
    console.error(`Error : ${response.status}`);
  }
};

getData();
