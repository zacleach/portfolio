/* All the words and films on the site live in this file.
   The easy way to change them is the editor: double-click "Edit site.command".
   By hand: a film is {"t": "Title", "d": "Description", "v": "YOUTUBE_ID"}
   and a multi-part piece is {"t": ..., "d": ..., "unit": "songs",
   "v": [["YOUTUBE_ID", "Song 1"], ["YOUTUBE_ID", "Song 2"]]}.
   The YouTube ID is the part after v= in the link.
   showreel: paste the YouTube ID of your reel between the quotes and a
   "Watch showreel" button appears at the top. vimeo: your Vimeo username,
   if you want it listed under About. */
const SITE = {
  "hero": {
    "name": "Zac Leach",
    "pitch": "Shooter-editor for live music, video podcasts and brands. London.",
    "detail": "I shoot, record sound, edit and grade, nearly always through 1.33× anamorphic lenses.",
    "available": "Available for bookings",
    "button": "Email me"
  },
  "showreel": "",
  "reels": [
    {
      "id": "commercial",
      "title": "Commercial",
      "lede": "Work for brands, magazines, universities and production companies. I film, record sound, light, edit and grade. 100k+ views across projects.",
      "items": [
        {
          "t": "Toksik Podcast",
          "unit": "episodes",
          "d": "A series for Mischief Managed Media that I film, light, record sound for and edit.",
          "v": [
            [
              "ZGUMlEa-c7g",
              "Episode 1, Black men and Black women"
            ],
            [
              "VCDbESIaFok",
              "Episode 2, Women open up about cheating"
            ],
            [
              "v1eUK54kgcs",
              "Episode 3, Whether men should show emotion around women"
            ],
            [
              "WClp5qcQRVA",
              "Episode 4"
            ]
          ]
        },
        {
          "t": "The Pinkprint UK x Pink Pilates",
          "unit": "videos",
          "d": "A four episode pilot podcast, shot and edited for Mischief Managed Media. Investors are looking to fund a second series. The mini advert shows their flower arranging and pilates classes.",
          "v": [
            [
              "K-tO_vgpD7w",
              "Episode 1, Colleagues"
            ],
            [
              "zhSpfP-UYl8",
              "Episode 2, Family"
            ],
            [
              "aQSY2WfwN_o",
              "Episode 3, Romance"
            ],
            [
              "tnieE3PiUxo",
              "Episode 4, Friends"
            ],
            [
              "x1KxbS2WMbs",
              "Pink Pilates mini advert"
            ]
          ]
        },
        {
          "t": "Snoop Dogg x Dr. Bombay Ice Cream",
          "v": "AtncqS2OchA",
          "d": "Spec ad, made unpaid for the brand’s advert competition. I wrote, directed, shot and edited it."
        },
        {
          "t": "NBCUniversal x HandsOnLondon",
          "v": "WflX_lAXvhc",
          "d": "I did the colour grade and the final export handoff for this collaboration."
        },
        {
          "t": "The Building Centre",
          "d": "Video Editor and Archival Assistant, September 2025. I edited a 10 minute display film in Premiere Pro for a giant multi-projection wall, made for the venue’s 75th anniversary exhibition. I digitised and worked in archival imagery, used AI tools to generate video footage, and managed all the software setups for the projectors.",
          "photos": [
            [
              "images/building-centre-zac.jpg",
              "Zac Leach standing in front of the projection wall at The Building Centre"
            ],
            [
              "images/building-centre-exhibition.jpg",
              "The 75 Years on Store Street exhibition, with the projection wall in the background"
            ]
          ],
          "pos": "50% 36%"
        },
        {
          "t": "Guitarist Magazine Masterclass, test shoot",
          "d": "My test shoot with John Etheridge of Soft Machine. It let the magazine see the format before they commissioned the series.",
          "v": "fwnvmo8w_2Y"
        }
      ]
    },
    {
      "id": "live",
      "title": "Live",
      "lede": "Live sets recorded in 4K with 32 bit surround and directional audio.",
      "items": [
        {
          "t": "Mannequin House at the Roundhouse",
          "unit": "songs",
          "d": "A live recording for Atticus Ticheli and Roy Chali. Four songs picked from the nine song set.",
          "v": [
            [
              "pBF9-64-3JU",
              "Whatever We Want"
            ],
            [
              "N2aPnO6-wck",
              "This Town"
            ],
            [
              "Rupb_wdBI9E",
              "To Talk (And Laugh)"
            ],
            [
              "e-cHbi7SgEE",
              "Hitchhike"
            ]
          ]
        },
        {
          "t": "Mannequin House, The Old Dispensary",
          "v": "klCqXv1UjJ8",
          "d": "Cut down gig from Camberwell."
        },
        {
          "t": "Mannequin House, Deptford Junction",
          "v": "HuYdAnFqsFk",
          "d": "Cut down gig from Deptford Junction."
        }
      ]
    },
    {
      "id": "music",
      "title": "Music videos",
      "lede": "Concept videos for cinematic songs nobody else has found, and music videos for singers.",
      "items": [
        {
          "t": "Omah Lay, Don’t Love Me",
          "v": "GiKxZX2ojiY",
          "d": "Concept video with @_mruche. I scouted, filmed and edited it."
        },
        {
          "t": "Morphine, Buena",
          "v": "aoXaur1A9-g",
          "d": "BMX riders from Sol BMX and parkour by @_dangerofdeath_ around sax player @usmansax in a skate park."
        },
        {
          "t": "Leslie Fortes, Emotions",
          "v": "FySCzNATVDA",
          "d": "I produced, shot, edited and graded it. I found the garage, got permission to film there for the day and cast the actor."
        },
        {
          "t": "Leslie Fortes, Don’t Know",
          "v": "dKAWdSzxMcY",
          "d": "Produced, shot, edited and graded by me, on a shop front I got permission to film for the day. A different style from Emotions."
        },
        {
          "t": "Atticus Ticheli, solo",
          "v": "QlKory0yiNY",
          "d": "One brick wall while the light slowly dims."
        }
      ]
    },
    {
      "id": "shorts",
      "title": "Short films",
      "lede": "Written, shot, directed and edited by me. Some are student work, the bigger ones were made on my own budget.",
      "items": [
        {
          "t": "Rock’n’Roll Star",
          "v": "Px7i1NBWjNo",
          "d": "A Guy Ritchie homage, and the biggest thing I’ve made. I location scouted and secured Drumsheds nightclub stage and backstage, Fiddler’s Elbow, and cameos from DJ Mark Radcliffe and Soft Machine guitarist John Etheridge."
        },
        {
          "t": "VAN MAN",
          "v": "X6bUoyy_F1U",
          "d": "An Edgar Wright Cornetto Trilogy homage. A radio channel counts down to nuclear war, with voices built from early ElevenLabs models."
        },
        {
          "t": "Egg",
          "v": "oQH7iOsG77k",
          "d": "Absurdist deadpan comedy in the spirit of Ivor Cutler, with actress Diana Condurat."
        },
        {
          "t": "Dearest",
          "v": "i8MiuXb3sAo",
          "d": "A 10 person collaboration in French flaneuse horror, set to Emmanuelle Seigner."
        },
        {
          "t": "After Dark",
          "v": "VH_XBhiqijs",
          "d": "I edited it and played the lead."
        }
      ]
    }
  ],
  "work": {
    "title": "Work with me",
    "lede": "Tell me what you’re making and when. I’ll reply with a plan and a quote.",
    "services": [
      {
        "t": "Live music",
        "d": "Gig films and single songs for venues, bands and labels, recorded in 4K with 32 bit audio."
      },
      {
        "t": "Video podcasts",
        "d": "Filmed, lit, recorded and edited as a series, from the pilot onwards."
      },
      {
        "t": "Music videos",
        "d": "Locations, casting, shoot, edit and grade, set up from scratch."
      },
      {
        "t": "Brands and events",
        "d": "Adverts, event coverage and short cuts for social media."
      },
      {
        "t": "Editing and colour",
        "d": "Footage you’ve already shot, cut down and graded. Three days of a wedding into one film, for example."
      }
    ],
    "button": "Email me about a project"
  },
  "about": {
    "title": "About",
    "paragraphs": [
      "London based filmmaker and post-production specialist with hands on experience in high end TV, film and exhibition environments.",
      "After graduating from the London Screen Academy with double Distinction diplomas, I focused on technical on set operations and post-production workflows. My recent work ranges from Camera and Lighting Trainee on Netflix’s Geek Girl and edit and VFX post house runner on Sky’s Gangs of London, to professional colour grading for NBCUniversal.",
      "Having worked behind the camera and as a featured artist on major productions, I understand the whole creative process.",
      "I’ve also been on set since 2024 as a featured artist and stand-in, including stand-in for Ringo Starr on Sam Mendes’s Beatles films."
    ],
    "email": "zzzacleach@gmail.com",
    "instagram": "@zacxleach",
    "vimeo": ""
  }
};
