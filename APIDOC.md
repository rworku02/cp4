# Song API Documentation
The song API gives a number of K-pop songs that will be organized by
the type of song they are.

## Get the types of the songs
**Request Format:** /write

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Outputs text containing the different types of song available in the API

**Example Request:** /write

**Example Response:**

```
Your choices are to either chillOut or cheerUp
```

**Error Handling:**
- Possible 500 errors (plain text):
  - if something went wrong within the server, returns an error with message: 'Oh no! Something went wrong with the server'

## Get all available songs
**Request Format:** /read/:file

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Given a valid file name, this will return a JSON object of
all the categories including the songs within them. The parameter will be the file name containing the songs. The file name given should be in lowercase letters and not contain the file type at the end of the filename.

**Example Request:** /read/songs

**Example Response:**

```json
{
 "chillOut" : [
    {
      "artist": "BTS",
      "song": "coffee"
    },
    {
      "artist": "Dean",
      "song": "D(Half Moon)"
    },
    {
      "artist": "Red Velvet",
      "song": "Eyes Locked, Hands Locked"
    },
    {
      "artist": "TXT",
      "song": "20cm"
    },
    {
      "artist": "WJSN",
      "song": "Our Garden"
    },
    {
      "artist": "BTS",
      "song": "134340"
    },
    {
      "artist": "Kai",
      "song": "Peaches"
    },
    {
      "artist": "Le Sserafim",
      "song": "Impurities"
    },
    {
      "artist": "Twice",
      "song": "Doughnut"
    },
    {
      "artist": "NCT Dream",
      "song": "Teddy Bear"
    }
  ],
  "cheerUp" : [
    {
      "artist": "Le Sserafim",
      "song": "Antifragile"
    },
    {
      "artist": "BTS",
      "song": "Blackswan"
    },
    {
      "artist": "TXT",
      "song": "Blue Orangeade"
    },
    {
      "artist": "Loona",
      "song": "So What"
    },
    {
      "artist": "Blackpink",
      "song": "Lovesick Girls"
    },
    {
      "artist": "EXO",
      "song": "Love Me Right"
    },
    {
      "artist": "fromis_9",
      "song": "We Go"
    },
    {
      "artist": "BTS",
      "song": "So What"
    },
    {
      "artist": "TXT",
      "song": "No Rules"
    },
    {
      "artist": "Twice",
      "song": "Fancy"
    }
  ]
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (plain text):
  - if a invalid file name is entered, returns an error with message: 'Not a valid file'
- Possible 500 errors (plain text):
  - if something went wrong with the server, returns an error with message: 'Oh no! Something went wrong with the server'
