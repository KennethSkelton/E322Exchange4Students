


export function testCreateItems() {
    var testOwnerIds = [1,2,3,4,5,6,7,8,9,10,11,12,13,15]

    var testDiscriptions = [
        "A pan", 
        "A mat", 
        "A handle",
        "my favorite sandwich", 
        "please buy this cursed book", 
        "$10 fortnite card, who wants it?", 
        "Lean green and ready for mean", 
        "murder weapon",
        "your left sock from childhood",
        "I am a shirt that can only be spoken about in the first person",
        "the grand calculotron",
        "could be better, could be worse",
        "boat that was sawed in half by phil swift",
        "I can't believe its not 'I can't believe its not butter'!",
        "please, please me",
        "you know you want it"
    ]



    var testPrices = [
        2.50, 
        14.50,
        1.50,
        150.00,
        6.66,
        11.0,
        4.20,
        13.37,
        2.39,
        11.11,
        12.34,
        50.50,
        5.50,
        4.44,
        540.04,
        70.07
    ]

    var testItems = [15]



    for(var i=0; i<testItems.length; i++){

        console.log("Debug");
        testItems[i] = new item(testOwnerIds[i], testDiscriptions[i], testPrices[i]);
        console.log(testItems[i].description)
    }

    return testItems;
}

testCreateItems();
