let cardStack = [];
let topSlotIndex = -1;
let inResetMode = false;

// Function to initialize the deck with 52 cards
function initializeDeck() {
    // Clear the card stack
    cardStack = [];

    // Define suits and ranks
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    function toggleFaceUp(card) {
      card.classList.toggle('face-up');
    }

    function toggleFaceDown(card) {
      card.classList.toggle('face-down');
    }

    // Loop through each suit
    for (const suit of suits) {
      for (const rank of ranks) {
        const card = document.createElement('div');
        card.className = 'card reserve-deck';
        // Check the suit and apply a class accordingly
        if (suit === '♥' || suit === '♦') {
           card.classList.add('red-suit');
        }

        // Create four small elements for the corners
        const corner1 = document.createElement('div');
        const corner2 = document.createElement('div');
        const corner3 = document.createElement('div');
        const corner4 = document.createElement('div');

        // Assign appropriate classes for the corners
        corner1.className = 'corner top left';
        corner2.className = 'corner top right';
        corner3.className = 'corner bottom left';
        corner4.className = 'corner bottom right';
 
        // Set the content for the corners
        corner1.textContent = rank + suit;
        corner2.textContent = rank + suit;
        corner3.textContent = rank + suit;
        corner4.textContent = rank + suit;

        // Append the corners to the card
        card.appendChild(corner1);
        card.appendChild(corner2);
        card.appendChild(corner3);
        card.appendChild(corner4);

        // Set the main content (face/number and suit) for the card
        card.innerHTML += `<div class="main">${rank + suit}</div>`;
	// Set face up for all cards
        cardStack.forEach(card => toggleFaceDown(card));
        cardStack.push(card);
        }
     }

    // Shuffle the deck
    shuffleDeck();

    // Initially, no card is shown in the top slot
    topSlotIndex = -1;

    // Display the initial state
    showCardInSlot('reserve-deck', topSlotIndex);
    showCardInSlot('discard-deck', -1); // Bottom slot is initially empty
}


// Shuffle function
function shuffleDeck() {
    for (let i = cardStack.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardStack[i], cardStack[j]] = [cardStack[j], cardStack[i]]; // Swap elements
    }
}

// Call initializeDeck and shuffleDeck
initializeDeck();

// Function to display a card in a slot
function showCardInSlot(slotId, cardIndex) {
    const slot = document.getElementById(slotId);
    slot.innerHTML = ''; // Clear any existing card
    const stack1 = document.getElementById('stack-1');
    if (cardIndex >= 0 && cardIndex < cardStack.length) {
	const card = cardStack[cardIndex];
        slot.appendChild(card);
    }
}

// Function to move the card from the top slot to the bottom slot
function moveCard() {
    // Check if the stack is being reset
    if (inResetMode) {
        // Add the first card back to the top slot
        topSlotIndex = 0;
        inResetMode = false;
    } else {
        // Increment the index to show the next card in the top slot
        topSlotIndex++;
    }

    // If all cards have been shown, reset the deck
    if (topSlotIndex >= cardStack.length) {
        inResetMode = true;
        showCardInSlot('discard-deck', cardStack.length - 1);
    } else {
        // Display the next card in the top slot
        showCardInSlot('reserve-deck', topSlotIndex);

        // Show the previous card in the bottom slot
        showCardInSlot('discard-deck', topSlotIndex - 1);
        
        // Toggle the face only for the card in the top slot
        toggleFaceDown(cardStack[topSlotIndex]);
    }
}


// Attach click event listener to the top slot
const topSlot = document.getElementById('reserve-deck');
topSlot.addEventListener('click', moveCard); // Add the listener again


function startNewGame() {
    // Check if there are cards in the card stack
    if (cardStack.length > 0) {
        // Shuffle the deck again to ensure random order
        shuffleDeck();

        // Iterate through stacks 1 to 7
        for (let stackNumber = 1; stackNumber <= 7; stackNumber++) {
            const stackId = `stack-${stackNumber}`;
            const stack = document.getElementById(stackId);

            // Add a certain number of cards to each stack based on its position
            for (let i = 0; i < stackNumber; i++) {
                // Check if there are still cards in the stack
                if (cardStack.length > 0) {
                    const card = cardStack.pop();
                    stack.appendChild(card);
                } else {
                    break; // If no more cards, exit the loop
                }
            }
        }
    }
}


// Attach click event listener to the "new-game" div
const newGameButton = document.getElementById('new-game');
newGameButton.addEventListener('click', startNewGame);

