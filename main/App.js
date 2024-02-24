  import React, { useEffect, useState } from 'react';
import './App.css';

const BluePegShop = () => {
  const [items, setItems] = useState({
    menTopwear: [],
    menBottomwear: [],
    womenTopwear: [],
    womenBottomwear: [],
  });
  const [highlightedDiv, setHighlightedDiv] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const addItemToDisplay = (itemsArray) => {
    return itemsArray.map((item, index) => (
      <div key={index}>
        <img src={item.img} alt={item.name} />
        <p>{item.description}</p>
      </div>
    ));
  };

  const highlightDiv = (divId) => {
    const highlightedDiv = document.querySelector('.highlight');
    if (highlightedDiv) {
      highlightedDiv.classList.remove('highlight');
    }

    // Add highlight to the targeted div
    const targetDiv = document.getElementById(divId);
    if (targetDiv) {
      targetDiv.classList.add('highlight');
    }
    window.location.href = `#${divId}`;
    setTimeout(() => {
      if (targetDiv) {
        targetDiv.classList.remove('highlight');
      }
    }, 2000);
  };

  const getInput = () => {
    const item = items[searchInput];
    if (item) {
      highlightDiv(searchInput);
    } else {
      alert(`No such item named ${searchInput} exists`);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('./items.json');
        const data = await response.json();
        setItems(data.clothes);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    // fetchItems();
  }, []);

  return (
    <div>
      <header>
        <nav>
          <div id="logo-name">
            <b>BluePeg</b>
            <br />
            shop online
          </div>
          <input
            id="searchbar"
            placeholder="search item here"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" id="searchbutton" onClick={getInput}>
            search
          </button>
        </nav>
      </header>

      <main>
        <div className="typesOfClothes">
          <button
            className={`type men-topwear ${highlightedDiv === 'menTopwear' ? 'highlight' : ''}`}
            onClick={() => highlightDiv('menTopwear')}
          >
            men-topwear
            <img src="funk Leather.jpg" alt="men-topwear" />
          </button>


          <button
            className={`type men-topwear ${highlightedDiv === 'menTopwear' ? 'highlight' : ''}`}
            onClick={() => highlightDiv('menBottomwear')}
          >
            men-bottomwear
            <img src="funk Leather.jpg" alt="men-topwear" />
          </button>


          <button
            className={`type men-topwear ${highlightedDiv === 'menTopwear' ? 'highlight' : ''}`}
            onClick={() => highlightDiv('womenTopwear')}
          >
            women-topwear
            <img src="funk Leather.jpg" alt="men-topwear" />
          </button>

          <button
            className={`type men-topwear ${highlightedDiv === 'menTopwear' ? 'highlight' : ''}`}
            onClick={() => highlightDiv('womenBottomwear')}
          >
            women-Bottomwear
            <img src="funk Leather.jpg" alt="men-topwear" />
          </button>


        </div>
        <div className="displayClothes">
          <div id="menTopwear">

            {addItemToDisplay(items.menTopwear)}

          </div>
          <div id="menBottomwear">

            {addItemToDisplay(items.menBottomwear)}

          </div>

          <div id="womenTopwear">

            {addItemToDisplay(items.womenTopwear)}

          </div>

          <div id="womenBottomwear">

            {addItemToDisplay(items.womenBottomwear)}

          </div>
        </div>
      </main>
    </div>
  );
};

export default BluePegShop;
