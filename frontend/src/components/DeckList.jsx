import React from 'react';

const DeckList = ({ decks, onSelectDeck }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Decks</h1>
      <div className="space-y-2">
        {decks.map((deck) => (
          <div
            key={deck.id}
            onClick={() => onSelectDeck(deck.id)}
            className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
          >
            {deck.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckList;