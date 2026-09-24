// Seeding data for FSL Learning Categories and Lessons (Generated)
async function seedDatabase() {
    console.log("Seeding IndexedDB database with English curriculum...");

    const categories = [
        {
                "id": "greetings",
                "name": "Greetings",
                "icon": "👋"
        },
        {
                "id": "survival",
                "name": "Survival",
                "icon": "🚨"
        },
        {
                "id": "numbers",
                "name": "Numbers",
                "icon": "🔢"
        },
        {
                "id": "calendar",
                "name": "Calendar",
                "icon": "📅"
        },
        {
                "id": "days",
                "name": "Days",
                "icon": "📆"
        },
        {
                "id": "alphabet",
                "name": "Alphabet",
                "icon": "🔤"
        },
        {
                "id": "family",
                "name": "Family",
                "icon": "👨‍👩‍👧‍👦"
        },
        {
                "id": "relationships",
                "name": "Relationships",
                "icon": "🤝"
        },
        {
                "id": "colors",
                "name": "Colors",
                "icon": "🎨"
        },
        {
                "id": "food",
                "name": "Food",
                "icon": "🍔"
        },
        {
                "id": "drinks",
                "name": "Drinks",
                "icon": "🥤"
        },
        {
                "id": "animals",
                "name": "Animals",
                "icon": "🐾"
        },
        {
                "id": "body_parts",
                "name": "Body Parts",
                "icon": "👤"
        },
        {
                "id": "emotion",
                "name": "Emotion",
                "icon": "😊"
        },
        {
                "id": "fruits",
                "name": "Fruits",
                "icon": "🍎"
        },
        {
                "id": "profession",
                "name": "Profession",
                "icon": "💼"
        },
        {
                "id": "vegetables",
                "name": "Vegetables",
                "icon": "🥦"
        },
        {
                "id": "adjective",
                "name": "Adjective",
                "icon": "✨"
        },
        {
                "id": "bible",
                "name": "Bible",
                "icon": "📖"
        },
        {
                "id": "places",
                "name": "Places",
                "icon": "📍"
        },
        {
                "id": "prepositions",
                "name": "Prepositions",
                "icon": "🗺️"
        },
        {
                "id": "verb",
                "name": "Verb",
                "icon": "🏃"
        },
        {
                "id": "pronouns",
                "name": "Pronouns",
                "icon": "🙋"
        },
        {
                "id": "hygiene",
                "name": "Hygiene",
                "icon": "🧼"
        }
];

    const lessons = [
        {
                "id": "lesson_0",
                "categoryId": "greetings",
                "title": "Magandang Umaga",
                "englishTitle": "Good Morning",
                "tagalogTitle": "Magandang Umaga",
                "description": "Sign the greeting 'Magandang Umaga' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the greeting.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear, polite gesture."
                ],
                "animation": "/fsl-105-dataset/clips/0/0.mp4"
        },
        {
                "id": "lesson_1",
                "categoryId": "greetings",
                "title": "Magandang Hapon",
                "englishTitle": "Good Afternoon",
                "tagalogTitle": "Magandang Hapon",
                "description": "Sign the greeting 'Magandang Hapon' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the greeting.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear, polite gesture."
                ],
                "animation": "/fsl-105-dataset/clips/1/0.mp4"
        },
        {
                "id": "lesson_2",
                "categoryId": "greetings",
                "title": "Magandang Gabi",
                "englishTitle": "Good Evening",
                "tagalogTitle": "Magandang Gabi",
                "description": "Sign the greeting 'Magandang Gabi' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the greeting.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear, polite gesture."
                ],
                "animation": "/fsl-105-dataset/clips/2/0.mp4"
        },
        {
                "id": "lesson_3",
                "categoryId": "greetings",
                "title": "Hello / Kamusta",
                "englishTitle": "Hello",
                "tagalogTitle": "Hello / Kamusta",
                "description": "Sign the greeting 'Hello / Kamusta' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the greeting.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear, polite gesture."
                ],
                "animation": "/fsl-105-dataset/clips/3/0.mp4"
        },
        {
                "id": "lesson_4",
                "categoryId": "greetings",
                "title": "Kamusta Ka",
                "englishTitle": "How Are You",
                "tagalogTitle": "Kamusta Ka",
                "description": "Sign the greeting 'Kamusta Ka' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the greeting.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear, polite gesture."
                ],
                "animation": "/fsl-105-dataset/clips/4/0.mp4"
        },
        {
                "id": "lesson_5",
                "categoryId": "greetings",
                "title": "Mabuti Naman",
                "englishTitle": "I'm Fine",
                "tagalogTitle": "Mabuti Naman",
                "description": "Sign the greeting 'Mabuti Naman' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the greeting.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear, polite gesture."
                ],
                "animation": "/fsl-105-dataset/clips/5/0.mp4"
        },
        {
                "id": "lesson_6",
                "categoryId": "greetings",
                "title": "Kinagagalak Kong Makilala Ka",
                "englishTitle": "Nice to Meet You",
                "tagalogTitle": "Kinagagalak Kong Makilala Ka",
                "description": "Sign the greeting 'Kinagagalak Kong Makilala Ka' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the greeting.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear, polite gesture."
                ],
                "animation": "/fsl-105-dataset/clips/6/0.mp4"
        },
        {
                "id": "lesson_7",
                "categoryId": "greetings",
                "title": "Salamat",
                "englishTitle": "Thank You",
                "tagalogTitle": "Salamat",
                "description": "Sign the greeting 'Salamat' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the greeting.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear, polite gesture."
                ],
                "animation": "/fsl-105-dataset/clips/7/0.mp4"
        },
        {
                "id": "lesson_8",
                "categoryId": "greetings",
                "title": "Walang Anuman",
                "englishTitle": "You're Welcome",
                "tagalogTitle": "Walang Anuman",
                "description": "Sign the greeting 'Walang Anuman' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the greeting.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear, polite gesture."
                ],
                "animation": "/fsl-105-dataset/clips/8/0.mp4"
        },
        {
                "id": "lesson_9",
                "categoryId": "greetings",
                "title": "Magkita Tayo Bukas",
                "englishTitle": "See You Tomorrow",
                "tagalogTitle": "Magkita Tayo Bukas",
                "description": "Sign the greeting 'Magkita Tayo Bukas' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the greeting.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear, polite gesture."
                ],
                "animation": "/fsl-105-dataset/clips/9/0.mp4"
        },
        {
                "id": "lesson_mahal_kita",
                "categoryId": "greetings",
                "title": "Mahal Kita",
                "englishTitle": "I Love You",
                "tagalogTitle": "Mahal Kita",
                "description": "Sign 'Mahal Kita' (I Love You) in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the ILY handshape with thumb, index finger, and pinky extended.",
                        "Hold the hand facing the viewer with middle and ring fingers folded into the palm.",
                        "Move the ILY handshape slightly forward toward the viewer with a warm smile."
                ],
                "animation": "/static/animations/mahal_kita.mp4"
        },

        {
                "id": "lesson_10",
                "categoryId": "survival",
                "title": "Naintindihan",
                "englishTitle": "Understand",
                "tagalogTitle": "Naintindihan",
                "description": "Sign 'Naintindihan' in Filipino Sign Language (FSL) for everyday conversation.",
                "steps": [
                        "Prepare your dominant hand in the starting position for the sign.",
                        "Observe the finger shape and movement trajectory in the demonstration.",
                        "Execute the sign with appropriate facial expression for clear understanding."
                ],
                "animation": "/fsl-105-dataset/clips/10/0.mp4"
        },
        {
                "id": "lesson_11",
                "categoryId": "survival",
                "title": "Hindi Naintindihan",
                "englishTitle": "Don't Understand",
                "tagalogTitle": "Hindi Naintindihan",
                "description": "Sign 'Hindi Naintindihan' in Filipino Sign Language (FSL) for everyday conversation.",
                "steps": [
                        "Prepare your dominant hand in the starting position for the sign.",
                        "Observe the finger shape and movement trajectory in the demonstration.",
                        "Execute the sign with appropriate facial expression for clear understanding."
                ],
                "animation": "/fsl-105-dataset/clips/11/0.mp4"
        },
        {
                "id": "lesson_12",
                "categoryId": "survival",
                "title": "Alam",
                "englishTitle": "Know",
                "tagalogTitle": "Alam",
                "description": "Sign 'Alam' in Filipino Sign Language (FSL) for everyday conversation.",
                "steps": [
                        "Prepare your dominant hand in the starting position for the sign.",
                        "Observe the finger shape and movement trajectory in the demonstration.",
                        "Execute the sign with appropriate facial expression for clear understanding."
                ],
                "animation": "/fsl-105-dataset/clips/12/0.mp4"
        },
        {
                "id": "lesson_13",
                "categoryId": "survival",
                "title": "Hindi Alam",
                "englishTitle": "Don't Know",
                "tagalogTitle": "Hindi Alam",
                "description": "Sign 'Hindi Alam' in Filipino Sign Language (FSL) for everyday conversation.",
                "steps": [
                        "Prepare your dominant hand in the starting position for the sign.",
                        "Observe the finger shape and movement trajectory in the demonstration.",
                        "Execute the sign with appropriate facial expression for clear understanding."
                ],
                "animation": "/fsl-105-dataset/clips/13/0.mp4"
        },
        {
                "id": "lesson_14",
                "categoryId": "survival",
                "title": "Hindi",
                "englishTitle": "No",
                "tagalogTitle": "Hindi",
                "description": "Sign 'Hindi' in Filipino Sign Language (FSL) for everyday conversation.",
                "steps": [
                        "Prepare your dominant hand in the starting position for the sign.",
                        "Observe the finger shape and movement trajectory in the demonstration.",
                        "Execute the sign with appropriate facial expression for clear understanding."
                ],
                "animation": "/fsl-105-dataset/clips/14/0.mp4"
        },
        {
                "id": "lesson_15",
                "categoryId": "survival",
                "title": "Oo",
                "englishTitle": "Yes",
                "tagalogTitle": "Oo",
                "description": "Sign 'Oo' in Filipino Sign Language (FSL) for everyday conversation.",
                "steps": [
                        "Prepare your dominant hand in the starting position for the sign.",
                        "Observe the finger shape and movement trajectory in the demonstration.",
                        "Execute the sign with appropriate facial expression for clear understanding."
                ],
                "animation": "/fsl-105-dataset/clips/15/0.mp4"
        },
        {
                "id": "lesson_16",
                "categoryId": "survival",
                "title": "Mali",
                "englishTitle": "Wrong",
                "tagalogTitle": "Mali",
                "description": "Sign 'Mali' in Filipino Sign Language (FSL) for everyday conversation.",
                "steps": [
                        "Prepare your dominant hand in the starting position for the sign.",
                        "Observe the finger shape and movement trajectory in the demonstration.",
                        "Execute the sign with appropriate facial expression for clear understanding."
                ],
                "animation": "/fsl-105-dataset/clips/16/0.mp4"
        },
        {
                "id": "lesson_17",
                "categoryId": "survival",
                "title": "Tama",
                "englishTitle": "Correct",
                "tagalogTitle": "Tama",
                "description": "Sign 'Tama' in Filipino Sign Language (FSL) for everyday conversation.",
                "steps": [
                        "Prepare your dominant hand in the starting position for the sign.",
                        "Observe the finger shape and movement trajectory in the demonstration.",
                        "Execute the sign with appropriate facial expression for clear understanding."
                ],
                "animation": "/fsl-105-dataset/clips/17/0.mp4"
        },
        {
                "id": "lesson_18",
                "categoryId": "survival",
                "title": "Mabagal",
                "englishTitle": "Slow",
                "tagalogTitle": "Mabagal",
                "description": "Sign 'Mabagal' in Filipino Sign Language (FSL) for everyday conversation.",
                "steps": [
                        "Prepare your dominant hand in the starting position for the sign.",
                        "Observe the finger shape and movement trajectory in the demonstration.",
                        "Execute the sign with appropriate facial expression for clear understanding."
                ],
                "animation": "/fsl-105-dataset/clips/18/0.mp4"
        },
        {
                "id": "lesson_19",
                "categoryId": "survival",
                "title": "Mabilis",
                "englishTitle": "Fast",
                "tagalogTitle": "Mabilis",
                "description": "Sign 'Mabilis' in Filipino Sign Language (FSL) for everyday conversation.",
                "steps": [
                        "Prepare your dominant hand in the starting position for the sign.",
                        "Observe the finger shape and movement trajectory in the demonstration.",
                        "Execute the sign with appropriate facial expression for clear understanding."
                ],
                "animation": "/fsl-105-dataset/clips/19/0.mp4"
        },
        {
                "id": "lesson_20",
                "categoryId": "numbers",
                "title": "Isa",
                "englishTitle": "One",
                "tagalogTitle": "Isa",
                "digit": "1",
                "description": "Sign the number 'Isa' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand at chest level facing the viewer.",
                        "Mirror the exact finger positioning and count shown in the video.",
                        "Hold the hand shape steady and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/20/0.mp4"
        },
        {
                "id": "lesson_21",
                "categoryId": "numbers",
                "title": "Dalawa",
                "englishTitle": "Two",
                "tagalogTitle": "Dalawa",
                "digit": "2",
                "description": "Sign the number 'Dalawa' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand at chest level facing the viewer.",
                        "Mirror the exact finger positioning and count shown in the video.",
                        "Hold the hand shape steady and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/21/0.mp4"
        },
        {
                "id": "lesson_22",
                "categoryId": "numbers",
                "title": "Tatlo",
                "englishTitle": "Three",
                "tagalogTitle": "Tatlo",
                "digit": "3",
                "description": "Sign the number 'Tatlo' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand at chest level facing the viewer.",
                        "Mirror the exact finger positioning and count shown in the video.",
                        "Hold the hand shape steady and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/22/0.mp4"
        },
        {
                "id": "lesson_23",
                "categoryId": "numbers",
                "title": "Apat",
                "englishTitle": "Four",
                "tagalogTitle": "Apat",
                "digit": "4",
                "description": "Sign the number 'Apat' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand at chest level facing the viewer.",
                        "Mirror the exact finger positioning and count shown in the video.",
                        "Hold the hand shape steady and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/23/0.mp4"
        },
        {
                "id": "lesson_24",
                "categoryId": "numbers",
                "title": "Lima",
                "englishTitle": "Five",
                "tagalogTitle": "Lima",
                "digit": "5",
                "description": "Sign the number 'Lima' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand at chest level facing the viewer.",
                        "Mirror the exact finger positioning and count shown in the video.",
                        "Hold the hand shape steady and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/24/0.mp4"
        },
        {
                "id": "lesson_25",
                "categoryId": "numbers",
                "title": "Anim",
                "englishTitle": "Six",
                "tagalogTitle": "Anim",
                "digit": "6",
                "description": "Sign the number 'Anim' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand at chest level facing the viewer.",
                        "Mirror the exact finger positioning and count shown in the video.",
                        "Hold the hand shape steady and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/25/0.mp4"
        },
        {
                "id": "lesson_26",
                "categoryId": "numbers",
                "title": "Pito",
                "englishTitle": "Seven",
                "tagalogTitle": "Pito",
                "digit": "7",
                "description": "Sign the number 'Pito' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand at chest level facing the viewer.",
                        "Mirror the exact finger positioning and count shown in the video.",
                        "Hold the hand shape steady and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/26/0.mp4"
        },
        {
                "id": "lesson_27",
                "categoryId": "numbers",
                "title": "Walo",
                "englishTitle": "Eight",
                "tagalogTitle": "Walo",
                "digit": "8",
                "description": "Sign the number 'Walo' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand at chest level facing the viewer.",
                        "Mirror the exact finger positioning and count shown in the video.",
                        "Hold the hand shape steady and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/27/0.mp4"
        },
        {
                "id": "lesson_28",
                "categoryId": "numbers",
                "title": "Siyam",
                "englishTitle": "Nine",
                "tagalogTitle": "Siyam",
                "digit": "9",
                "description": "Sign the number 'Siyam' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand at chest level facing the viewer.",
                        "Mirror the exact finger positioning and count shown in the video.",
                        "Hold the hand shape steady and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/28/0.mp4"
        },
        {
                "id": "lesson_29",
                "categoryId": "numbers",
                "title": "Sampu",
                "englishTitle": "Ten",
                "tagalogTitle": "Sampu",
                "digit": "10",
                "description": "Sign the number 'Sampu' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand at chest level facing the viewer.",
                        "Mirror the exact finger positioning and count shown in the video.",
                        "Hold the hand shape steady and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/29/0.mp4"
        },
        {
                "id": "lesson_30",
                "categoryId": "calendar",
                "title": "Enero",
                "englishTitle": "January",
                "tagalogTitle": "Enero",
                "description": "Sign the month of 'Enero' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand in front of your upper torso to begin the sign.",
                        "Follow the hand shape and movement direction demonstrated in the video.",
                        "Complete the sign smoothly with precise finger placement."
                ],
                "animation": "/fsl-105-dataset/clips/30/0.mp4"
        },
        {
                "id": "lesson_31",
                "categoryId": "calendar",
                "title": "Pebrero",
                "englishTitle": "February",
                "tagalogTitle": "Pebrero",
                "description": "Sign the month of 'Pebrero' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand in front of your upper torso to begin the sign.",
                        "Follow the hand shape and movement direction demonstrated in the video.",
                        "Complete the sign smoothly with precise finger placement."
                ],
                "animation": "/fsl-105-dataset/clips/31/0.mp4"
        },
        {
                "id": "lesson_32",
                "categoryId": "calendar",
                "title": "Marso",
                "englishTitle": "March",
                "tagalogTitle": "Marso",
                "description": "Sign the month of 'Marso' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand in front of your upper torso to begin the sign.",
                        "Follow the hand shape and movement direction demonstrated in the video.",
                        "Complete the sign smoothly with precise finger placement."
                ],
                "animation": "/fsl-105-dataset/clips/32/0.mp4"
        },
        {
                "id": "lesson_33",
                "categoryId": "calendar",
                "title": "Abril",
                "englishTitle": "April",
                "tagalogTitle": "Abril",
                "description": "Sign the month of 'Abril' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand in front of your upper torso to begin the sign.",
                        "Follow the hand shape and movement direction demonstrated in the video.",
                        "Complete the sign smoothly with precise finger placement."
                ],
                "animation": "/fsl-105-dataset/clips/33/0.mp4"
        },
        {
                "id": "lesson_34",
                "categoryId": "calendar",
                "title": "Mayo",
                "englishTitle": "May",
                "tagalogTitle": "Mayo",
                "description": "Sign the month of 'Mayo' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand in front of your upper torso to begin the sign.",
                        "Follow the hand shape and movement direction demonstrated in the video.",
                        "Complete the sign smoothly with precise finger placement."
                ],
                "animation": "/fsl-105-dataset/clips/34/0.mp4"
        },
        {
                "id": "lesson_35",
                "categoryId": "calendar",
                "title": "Hunyo",
                "englishTitle": "June",
                "tagalogTitle": "Hunyo",
                "description": "Sign the month of 'Hunyo' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand in front of your upper torso to begin the sign.",
                        "Follow the hand shape and movement direction demonstrated in the video.",
                        "Complete the sign smoothly with precise finger placement."
                ],
                "animation": "/fsl-105-dataset/clips/35/0.mp4"
        },
        {
                "id": "lesson_36",
                "categoryId": "calendar",
                "title": "Hulyo",
                "englishTitle": "July",
                "tagalogTitle": "Hulyo",
                "description": "Sign the month of 'Hulyo' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand in front of your upper torso to begin the sign.",
                        "Follow the hand shape and movement direction demonstrated in the video.",
                        "Complete the sign smoothly with precise finger placement."
                ],
                "animation": "/fsl-105-dataset/clips/36/0.mp4"
        },
        {
                "id": "lesson_37",
                "categoryId": "calendar",
                "title": "Agosto",
                "englishTitle": "August",
                "tagalogTitle": "Agosto",
                "description": "Sign the month of 'Agosto' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand in front of your upper torso to begin the sign.",
                        "Follow the hand shape and movement direction demonstrated in the video.",
                        "Complete the sign smoothly with precise finger placement."
                ],
                "animation": "/fsl-105-dataset/clips/37/0.mp4"
        },
        {
                "id": "lesson_38",
                "categoryId": "calendar",
                "title": "Setyembre",
                "englishTitle": "September",
                "tagalogTitle": "Setyembre",
                "description": "Sign the month of 'Setyembre' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand in front of your upper torso to begin the sign.",
                        "Follow the hand shape and movement direction demonstrated in the video.",
                        "Complete the sign smoothly with precise finger placement."
                ],
                "animation": "/fsl-105-dataset/clips/38/0.mp4"
        },
        {
                "id": "lesson_39",
                "categoryId": "calendar",
                "title": "Oktubre",
                "englishTitle": "October",
                "tagalogTitle": "Oktubre",
                "description": "Sign the month of 'Oktubre' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand in front of your upper torso to begin the sign.",
                        "Follow the hand shape and movement direction demonstrated in the video.",
                        "Complete the sign smoothly with precise finger placement."
                ],
                "animation": "/fsl-105-dataset/clips/39/0.mp4"
        },
        {
                "id": "lesson_40",
                "categoryId": "calendar",
                "title": "Nobyembre",
                "englishTitle": "November",
                "tagalogTitle": "Nobyembre",
                "description": "Sign the month of 'Nobyembre' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand in front of your upper torso to begin the sign.",
                        "Follow the hand shape and movement direction demonstrated in the video.",
                        "Complete the sign smoothly with precise finger placement."
                ],
                "animation": "/fsl-105-dataset/clips/40/0.mp4"
        },
        {
                "id": "lesson_41",
                "categoryId": "calendar",
                "title": "Disyembre",
                "englishTitle": "December",
                "tagalogTitle": "Disyembre",
                "description": "Sign the month of 'Disyembre' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand in front of your upper torso to begin the sign.",
                        "Follow the hand shape and movement direction demonstrated in the video.",
                        "Complete the sign smoothly with precise finger placement."
                ],
                "animation": "/fsl-105-dataset/clips/41/0.mp4"
        },
        {
                "id": "lesson_42",
                "categoryId": "days",
                "title": "Lunes",
                "englishTitle": "Monday",
                "tagalogTitle": "Lunes",
                "description": "Sign the day or time expression 'Lunes' in Filipino Sign Language (FSL).",
                "steps": [
                        "Set your dominant hand in position for the day or time reference.",
                        "Follow the specific hand movement and rotation shown in the demonstration.",
                        "Ensure the gesture is distinct and executed clearly."
                ],
                "animation": "/fsl-105-dataset/clips/42/0.mp4"
        },
        {
                "id": "lesson_43",
                "categoryId": "days",
                "title": "Martes",
                "englishTitle": "Tuesday",
                "tagalogTitle": "Martes",
                "description": "Sign the day or time expression 'Martes' in Filipino Sign Language (FSL).",
                "steps": [
                        "Set your dominant hand in position for the day or time reference.",
                        "Follow the specific hand movement and rotation shown in the demonstration.",
                        "Ensure the gesture is distinct and executed clearly."
                ],
                "animation": "/fsl-105-dataset/clips/43/0.mp4"
        },
        {
                "id": "lesson_44",
                "categoryId": "days",
                "title": "Miyerkules",
                "englishTitle": "Wednesday",
                "tagalogTitle": "Miyerkules",
                "description": "Sign the day or time expression 'Miyerkules' in Filipino Sign Language (FSL).",
                "steps": [
                        "Set your dominant hand in position for the day or time reference.",
                        "Follow the specific hand movement and rotation shown in the demonstration.",
                        "Ensure the gesture is distinct and executed clearly."
                ],
                "animation": "/fsl-105-dataset/clips/44/0.mp4"
        },
        {
                "id": "lesson_45",
                "categoryId": "days",
                "title": "Huwebes",
                "englishTitle": "Thursday",
                "tagalogTitle": "Huwebes",
                "description": "Sign the day or time expression 'Huwebes' in Filipino Sign Language (FSL).",
                "steps": [
                        "Set your dominant hand in position for the day or time reference.",
                        "Follow the specific hand movement and rotation shown in the demonstration.",
                        "Ensure the gesture is distinct and executed clearly."
                ],
                "animation": "/fsl-105-dataset/clips/45/0.mp4"
        },
        {
                "id": "lesson_46",
                "categoryId": "days",
                "title": "Biyernes",
                "englishTitle": "Friday",
                "tagalogTitle": "Biyernes",
                "description": "Sign the day or time expression 'Biyernes' in Filipino Sign Language (FSL).",
                "steps": [
                        "Set your dominant hand in position for the day or time reference.",
                        "Follow the specific hand movement and rotation shown in the demonstration.",
                        "Ensure the gesture is distinct and executed clearly."
                ],
                "animation": "/fsl-105-dataset/clips/46/0.mp4"
        },
        {
                "id": "lesson_47",
                "categoryId": "days",
                "title": "Sabado",
                "englishTitle": "Saturday",
                "tagalogTitle": "Sabado",
                "description": "Sign the day or time expression 'Sabado' in Filipino Sign Language (FSL).",
                "steps": [
                        "Set your dominant hand in position for the day or time reference.",
                        "Follow the specific hand movement and rotation shown in the demonstration.",
                        "Ensure the gesture is distinct and executed clearly."
                ],
                "animation": "/fsl-105-dataset/clips/47/0.mp4"
        },
        {
                "id": "lesson_48",
                "categoryId": "days",
                "title": "Linggo",
                "englishTitle": "Sunday",
                "tagalogTitle": "Linggo",
                "description": "Sign the day or time expression 'Linggo' in Filipino Sign Language (FSL).",
                "steps": [
                        "Set your dominant hand in position for the day or time reference.",
                        "Follow the specific hand movement and rotation shown in the demonstration.",
                        "Ensure the gesture is distinct and executed clearly."
                ],
                "animation": "/fsl-105-dataset/clips/48/0.mp4"
        },
        {
                "id": "lesson_49",
                "categoryId": "days",
                "title": "Ngayon",
                "englishTitle": "Today",
                "tagalogTitle": "Ngayon",
                "description": "Sign the day or time expression 'Ngayon' in Filipino Sign Language (FSL).",
                "steps": [
                        "Set your dominant hand in position for the day or time reference.",
                        "Follow the specific hand movement and rotation shown in the demonstration.",
                        "Ensure the gesture is distinct and executed clearly."
                ],
                "animation": "/fsl-105-dataset/clips/49/0.mp4"
        },
        {
                "id": "lesson_50",
                "categoryId": "days",
                "title": "Bukas",
                "englishTitle": "Tomorrow",
                "tagalogTitle": "Bukas",
                "description": "Sign the day or time expression 'Bukas' in Filipino Sign Language (FSL).",
                "steps": [
                        "Set your dominant hand in position for the day or time reference.",
                        "Follow the specific hand movement and rotation shown in the demonstration.",
                        "Ensure the gesture is distinct and executed clearly."
                ],
                "animation": "/fsl-105-dataset/clips/50/0.mp4"
        },
        {
                "id": "lesson_51",
                "categoryId": "days",
                "title": "Kahapon",
                "englishTitle": "Yesterday",
                "tagalogTitle": "Kahapon",
                "description": "Sign the day or time expression 'Kahapon' in Filipino Sign Language (FSL).",
                "steps": [
                        "Set your dominant hand in position for the day or time reference.",
                        "Follow the specific hand movement and rotation shown in the demonstration.",
                        "Ensure the gesture is distinct and executed clearly."
                ],
                "animation": "/fsl-105-dataset/clips/51/0.mp4"
        },
        {
                "id": "lesson_52",
                "categoryId": "family",
                "title": "Tatay / Ama",
                "englishTitle": "Father",
                "tagalogTitle": "Tatay / Ama",
                "description": "Sign the family member 'Tatay / Ama' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant hand in the starting location near the face or chest.",
                        "Follow the designated hand shape and movement path shown in the video.",
                        "Execute the gesture smoothly to clearly communicate the family member."
                ],
                "animation": "/fsl-105-dataset/clips/52/0.mp4"
        },
        {
                "id": "lesson_53",
                "categoryId": "family",
                "title": "Nanay / Ina",
                "englishTitle": "Mother",
                "tagalogTitle": "Nanay / Ina",
                "description": "Sign the family member 'Nanay / Ina' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant hand in the starting location near the face or chest.",
                        "Follow the designated hand shape and movement path shown in the video.",
                        "Execute the gesture smoothly to clearly communicate the family member."
                ],
                "animation": "/fsl-105-dataset/clips/53/0.mp4"
        },
        {
                "id": "lesson_54",
                "categoryId": "family",
                "title": "Anak na Lalaki",
                "englishTitle": "Son",
                "tagalogTitle": "Anak na Lalaki",
                "description": "Sign the family member 'Anak na Lalaki' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant hand in the starting location near the face or chest.",
                        "Follow the designated hand shape and movement path shown in the video.",
                        "Execute the gesture smoothly to clearly communicate the family member."
                ],
                "animation": "/fsl-105-dataset/clips/54/0.mp4"
        },
        {
                "id": "lesson_55",
                "categoryId": "family",
                "title": "Anak na Babae",
                "englishTitle": "Daughter",
                "tagalogTitle": "Anak na Babae",
                "description": "Sign the family member 'Anak na Babae' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant hand in the starting location near the face or chest.",
                        "Follow the designated hand shape and movement path shown in the video.",
                        "Execute the gesture smoothly to clearly communicate the family member."
                ],
                "animation": "/fsl-105-dataset/clips/55/0.mp4"
        },
        {
                "id": "lesson_56",
                "categoryId": "family",
                "title": "Lolo",
                "englishTitle": "Grandfather",
                "tagalogTitle": "Lolo",
                "description": "Sign the family member 'Lolo' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant hand in the starting location near the face or chest.",
                        "Follow the designated hand shape and movement path shown in the video.",
                        "Execute the gesture smoothly to clearly communicate the family member."
                ],
                "animation": "/fsl-105-dataset/clips/56/0.mp4"
        },
        {
                "id": "lesson_57",
                "categoryId": "family",
                "title": "Lola",
                "englishTitle": "Grandmother",
                "tagalogTitle": "Lola",
                "description": "Sign the family member 'Lola' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant hand in the starting location near the face or chest.",
                        "Follow the designated hand shape and movement path shown in the video.",
                        "Execute the gesture smoothly to clearly communicate the family member."
                ],
                "animation": "/fsl-105-dataset/clips/57/0.mp4"
        },
        {
                "id": "lesson_58",
                "categoryId": "family",
                "title": "Tito",
                "englishTitle": "Uncle",
                "tagalogTitle": "Tito",
                "description": "Sign the family member 'Tito' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant hand in the starting location near the face or chest.",
                        "Follow the designated hand shape and movement path shown in the video.",
                        "Execute the gesture smoothly to clearly communicate the family member."
                ],
                "animation": "/fsl-105-dataset/clips/58/0.mp4"
        },
        {
                "id": "lesson_59",
                "categoryId": "family",
                "title": "Tita",
                "englishTitle": "Auntie",
                "tagalogTitle": "Tita",
                "description": "Sign the family member 'Tita' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant hand in the starting location near the face or chest.",
                        "Follow the designated hand shape and movement path shown in the video.",
                        "Execute the gesture smoothly to clearly communicate the family member."
                ],
                "animation": "/fsl-105-dataset/clips/59/0.mp4"
        },
        {
                "id": "lesson_60",
                "categoryId": "family",
                "title": "Pinsan",
                "englishTitle": "Cousin",
                "tagalogTitle": "Pinsan",
                "description": "Sign the family member 'Pinsan' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant hand in the starting location near the face or chest.",
                        "Follow the designated hand shape and movement path shown in the video.",
                        "Execute the gesture smoothly to clearly communicate the family member."
                ],
                "animation": "/fsl-105-dataset/clips/60/0.mp4"
        },
        {
                "id": "lesson_61",
                "categoryId": "family",
                "title": "Mga Magulang",
                "englishTitle": "Parents",
                "tagalogTitle": "Mga Magulang",
                "description": "Sign the family member 'Mga Magulang' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant hand in the starting location near the face or chest.",
                        "Follow the designated hand shape and movement path shown in the video.",
                        "Execute the gesture smoothly to clearly communicate the family member."
                ],
                "animation": "/fsl-105-dataset/clips/61/0.mp4"
        },
        {
                "id": "lesson_62",
                "categoryId": "relationships",
                "title": "Batang Lalaki",
                "englishTitle": "Boy",
                "tagalogTitle": "Batang Lalaki",
                "description": "Sign 'Boy' in Filipino Sign Language (FSL) to describe individuals or relationships.",
                "steps": [
                        "Prepare your hand shape according to the sign demonstration.",
                        "Match the finger formation and directional orientation shown in the video.",
                        "Execute the sign clearly at the proper body location."
                ],
                "animation": "/fsl-105-dataset/clips/62/0.mp4"
        },
        {
                "id": "lesson_63",
                "categoryId": "relationships",
                "title": "Batang Babae",
                "englishTitle": "Girl",
                "tagalogTitle": "Batang Babae",
                "description": "Sign 'Girl' in Filipino Sign Language (FSL) to describe individuals or relationships.",
                "steps": [
                        "Prepare your hand shape according to the sign demonstration.",
                        "Match the finger formation and directional orientation shown in the video.",
                        "Execute the sign clearly at the proper body location."
                ],
                "animation": "/fsl-105-dataset/clips/63/0.mp4"
        },
        {
                "id": "lesson_64",
                "categoryId": "relationships",
                "title": "Lalaki",
                "englishTitle": "Man",
                "tagalogTitle": "Lalaki",
                "description": "Sign 'Man' in Filipino Sign Language (FSL) to describe individuals or relationships.",
                "steps": [
                        "Prepare your hand shape according to the sign demonstration.",
                        "Match the finger formation and directional orientation shown in the video.",
                        "Execute the sign clearly at the proper body location."
                ],
                "animation": "/fsl-105-dataset/clips/64/0.mp4"
        },
        {
                "id": "lesson_65",
                "categoryId": "relationships",
                "title": "Babae",
                "englishTitle": "Woman",
                "tagalogTitle": "Babae",
                "description": "Sign 'Woman' in Filipino Sign Language (FSL) to describe individuals or relationships.",
                "steps": [
                        "Prepare your hand shape according to the sign demonstration.",
                        "Match the finger formation and directional orientation shown in the video.",
                        "Execute the sign clearly at the proper body location."
                ],
                "animation": "/fsl-105-dataset/clips/65/0.mp4"
        },
        {
                "id": "lesson_66",
                "categoryId": "relationships",
                "title": "Bingi",
                "englishTitle": "Deaf",
                "tagalogTitle": "Bingi",
                "description": "Sign 'Deaf' in Filipino Sign Language (FSL) to describe individuals or relationships.",
                "steps": [
                        "Prepare your hand shape according to the sign demonstration.",
                        "Match the finger formation and directional orientation shown in the video.",
                        "Execute the sign clearly at the proper body location."
                ],
                "animation": "/fsl-105-dataset/clips/66/0.mp4"
        },
        {
                "id": "lesson_67",
                "categoryId": "relationships",
                "title": "Mahina ang Pandinig",
                "englishTitle": "Hard of Hearing",
                "tagalogTitle": "Mahina ang Pandinig",
                "description": "Sign 'Hard of Hearing' in Filipino Sign Language (FSL) to describe individuals or relationships.",
                "steps": [
                        "Prepare your hand shape according to the sign demonstration.",
                        "Match the finger formation and directional orientation shown in the video.",
                        "Execute the sign clearly at the proper body location."
                ],
                "animation": "/fsl-105-dataset/clips/67/0.mp4"
        },
        {
                "id": "lesson_68",
                "categoryId": "relationships",
                "title": "Gumagamit ng Wheelchair",
                "englishTitle": "Wheelchair User",
                "tagalogTitle": "Gumagamit ng Wheelchair",
                "description": "Sign 'Wheelchair User' in Filipino Sign Language (FSL) to describe individuals or relationships.",
                "steps": [
                        "Prepare your hand shape according to the sign demonstration.",
                        "Match the finger formation and directional orientation shown in the video.",
                        "Execute the sign clearly at the proper body location."
                ],
                "animation": "/fsl-105-dataset/clips/68/0.mp4"
        },
        {
                "id": "lesson_69",
                "categoryId": "relationships",
                "title": "Bulag",
                "englishTitle": "Blind",
                "tagalogTitle": "Bulag",
                "description": "Sign 'Blind' in Filipino Sign Language (FSL) to describe individuals or relationships.",
                "steps": [
                        "Prepare your hand shape according to the sign demonstration.",
                        "Match the finger formation and directional orientation shown in the video.",
                        "Execute the sign clearly at the proper body location."
                ],
                "animation": "/fsl-105-dataset/clips/69/0.mp4"
        },
        {
                "id": "lesson_70",
                "categoryId": "relationships",
                "title": "Bingi at Bulag",
                "englishTitle": "Deaf-Blind",
                "tagalogTitle": "Bingi at Bulag",
                "description": "Sign 'Deaf-Blind' in Filipino Sign Language (FSL) to describe individuals or relationships.",
                "steps": [
                        "Prepare your hand shape according to the sign demonstration.",
                        "Match the finger formation and directional orientation shown in the video.",
                        "Execute the sign clearly at the proper body location."
                ],
                "animation": "/fsl-105-dataset/clips/70/0.mp4"
        },
        {
                "id": "lesson_71",
                "categoryId": "relationships",
                "title": "Kasal",
                "englishTitle": "Married",
                "tagalogTitle": "Kasal",
                "description": "Sign 'Married' in Filipino Sign Language (FSL) to describe individuals or relationships.",
                "steps": [
                        "Prepare your hand shape according to the sign demonstration.",
                        "Match the finger formation and directional orientation shown in the video.",
                        "Execute the sign clearly at the proper body location."
                ],
                "animation": "/fsl-105-dataset/clips/71/0.mp4"
        },
        {
                "id": "lesson_72",
                "categoryId": "colors",
                "title": "Asul",
                "englishTitle": "Blue",
                "tagalogTitle": "Asul",
                "description": "Sign the color 'Blue' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the initial hand shape for the color sign.",
                        "Replicate the specific motion, brush, or flutter demonstrated in the video.",
                        "Keep the movement controlled and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/72/0.mp4"
        },
        {
                "id": "lesson_73",
                "categoryId": "colors",
                "title": "Berde",
                "englishTitle": "Green",
                "tagalogTitle": "Berde",
                "description": "Sign the color 'Green' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the initial hand shape for the color sign.",
                        "Replicate the specific motion, brush, or flutter demonstrated in the video.",
                        "Keep the movement controlled and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/73/0.mp4"
        },
        {
                "id": "lesson_74",
                "categoryId": "colors",
                "title": "Pula",
                "englishTitle": "Red",
                "tagalogTitle": "Pula",
                "description": "Sign the color 'Red' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the initial hand shape for the color sign.",
                        "Replicate the specific motion, brush, or flutter demonstrated in the video.",
                        "Keep the movement controlled and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/74/0.mp4"
        },
        {
                "id": "lesson_75",
                "categoryId": "colors",
                "title": "Kayumanggi",
                "englishTitle": "Brown",
                "tagalogTitle": "Kayumanggi",
                "description": "Sign the color 'Brown' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the initial hand shape for the color sign.",
                        "Replicate the specific motion, brush, or flutter demonstrated in the video.",
                        "Keep the movement controlled and clearly visible."
                ],
                "animation": "/additional-sl/color/brown_01.mp4"
        },
        {
                "id": "lesson_76",
                "categoryId": "colors",
                "title": "Itim",
                "englishTitle": "Black",
                "tagalogTitle": "Itim",
                "description": "Sign the color 'Black' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the initial hand shape for the color sign.",
                        "Replicate the specific motion, brush, or flutter demonstrated in the video.",
                        "Keep the movement controlled and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/76/0.mp4"
        },
        {
                "id": "lesson_77",
                "categoryId": "colors",
                "title": "Puti",
                "englishTitle": "White",
                "tagalogTitle": "Puti",
                "description": "Sign the color 'White' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the initial hand shape for the color sign.",
                        "Replicate the specific motion, brush, or flutter demonstrated in the video.",
                        "Keep the movement controlled and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/77/0.mp4"
        },
        {
                "id": "lesson_78",
                "categoryId": "colors",
                "title": "Dilaw",
                "englishTitle": "Yellow",
                "tagalogTitle": "Dilaw",
                "description": "Sign the color 'Yellow' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the initial hand shape for the color sign.",
                        "Replicate the specific motion, brush, or flutter demonstrated in the video.",
                        "Keep the movement controlled and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/78/0.mp4"
        },
        {
                "id": "lesson_79",
                "categoryId": "colors",
                "title": "Kahel",
                "englishTitle": "Orange",
                "tagalogTitle": "Kahel",
                "description": "Sign the color 'Orange' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the initial hand shape for the color sign.",
                        "Replicate the specific motion, brush, or flutter demonstrated in the video.",
                        "Keep the movement controlled and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/79/0.mp4"
        },
        {
                "id": "lesson_80",
                "categoryId": "colors",
                "title": "Abo",
                "englishTitle": "Gray",
                "tagalogTitle": "Abo",
                "description": "Sign the color 'Gray' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the initial hand shape for the color sign.",
                        "Replicate the specific motion, brush, or flutter demonstrated in the video.",
                        "Keep the movement controlled and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/80/0.mp4"
        },
        {
                "id": "lesson_81",
                "categoryId": "colors",
                "title": "Rosas",
                "englishTitle": "Pink",
                "tagalogTitle": "Rosas",
                "description": "Sign the color 'Pink' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the initial hand shape for the color sign.",
                        "Replicate the specific motion, brush, or flutter demonstrated in the video.",
                        "Keep the movement controlled and clearly visible."
                ],
                "animation": "/additional-sl/color/pink_01.mp4"
        },
        {
                "id": "lesson_82",
                "categoryId": "colors",
                "title": "Lila",
                "englishTitle": "Violet",
                "tagalogTitle": "Lila",
                "description": "Sign the color 'Violet' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the initial hand shape for the color sign.",
                        "Replicate the specific motion, brush, or flutter demonstrated in the video.",
                        "Keep the movement controlled and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/82/0.mp4"
        },
        {
                "id": "lesson_83",
                "categoryId": "colors",
                "title": "Maliwanag",
                "englishTitle": "Light",
                "tagalogTitle": "Maliwanag",
                "description": "Sign the color 'Light' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the initial hand shape for the color sign.",
                        "Replicate the specific motion, brush, or flutter demonstrated in the video.",
                        "Keep the movement controlled and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/83/0.mp4"
        },
        {
                "id": "lesson_84",
                "categoryId": "colors",
                "title": "Madilim",
                "englishTitle": "Dark",
                "tagalogTitle": "Madilim",
                "description": "Sign the color 'Dark' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the initial hand shape for the color sign.",
                        "Replicate the specific motion, brush, or flutter demonstrated in the video.",
                        "Keep the movement controlled and clearly visible."
                ],
                "animation": "/fsl-105-dataset/clips/84/0.mp4"
        },
        {
                "id": "lesson_85",
                "categoryId": "food",
                "title": "Tinapay",
                "englishTitle": "Bread",
                "tagalogTitle": "Tinapay",
                "description": "Sign the food item 'Bread' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand near the mouth or chest area as shown in the video.",
                        "Mirror the mimed action or sign gesture for the food item.",
                        "Perform the movement cleanly with natural pacing."
                ],
                "animation": "/fsl-105-dataset/clips/85/0.mp4"
        },
        {
                "id": "lesson_86",
                "categoryId": "food",
                "title": "Itlog",
                "englishTitle": "Egg",
                "tagalogTitle": "Itlog",
                "description": "Sign the food item 'Egg' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand near the mouth or chest area as shown in the video.",
                        "Mirror the mimed action or sign gesture for the food item.",
                        "Perform the movement cleanly with natural pacing."
                ],
                "animation": "/fsl-105-dataset/clips/86/0.mp4"
        },
        {
                "id": "lesson_87",
                "categoryId": "food",
                "title": "Isda",
                "englishTitle": "Fish",
                "tagalogTitle": "Isda",
                "description": "Sign the food item 'Fish' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand near the mouth or chest area as shown in the video.",
                        "Mirror the mimed action or sign gesture for the food item.",
                        "Perform the movement cleanly with natural pacing."
                ],
                "animation": "/fsl-105-dataset/clips/87/0.mp4"
        },
        {
                "id": "lesson_88",
                "categoryId": "food",
                "title": "Karne",
                "englishTitle": "Meat",
                "tagalogTitle": "Karne",
                "description": "Sign the food item 'Meat' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand near the mouth or chest area as shown in the video.",
                        "Mirror the mimed action or sign gesture for the food item.",
                        "Perform the movement cleanly with natural pacing."
                ],
                "animation": "/fsl-105-dataset/clips/88/0.mp4"
        },
        {
                "id": "lesson_89",
                "categoryId": "food",
                "title": "Manok",
                "englishTitle": "Chicken",
                "tagalogTitle": "Manok",
                "description": "Sign the food item 'Chicken' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand near the mouth or chest area as shown in the video.",
                        "Mirror the mimed action or sign gesture for the food item.",
                        "Perform the movement cleanly with natural pacing."
                ],
                "animation": "/fsl-105-dataset/clips/89/0.mp4"
        },
        {
                "id": "lesson_90",
                "categoryId": "food",
                "title": "Spaghetti",
                "englishTitle": "Spaghetti",
                "tagalogTitle": "Spaghetti",
                "description": "Sign the food item 'Spaghetti' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand near the mouth or chest area as shown in the video.",
                        "Mirror the mimed action or sign gesture for the food item.",
                        "Perform the movement cleanly with natural pacing."
                ],
                "animation": "/fsl-105-dataset/clips/90/0.mp4"
        },
        {
                "id": "lesson_91",
                "categoryId": "food",
                "title": "Kanin",
                "englishTitle": "Rice",
                "tagalogTitle": "Kanin",
                "description": "Sign the food item 'Rice' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand near the mouth or chest area as shown in the video.",
                        "Mirror the mimed action or sign gesture for the food item.",
                        "Perform the movement cleanly with natural pacing."
                ],
                "animation": "/fsl-105-dataset/clips/91/0.mp4"
        },
        {
                "id": "lesson_92",
                "categoryId": "food",
                "title": "Longganisa",
                "englishTitle": "Longganisa",
                "tagalogTitle": "Longganisa",
                "description": "Sign the food item 'Longganisa' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand near the mouth or chest area as shown in the video.",
                        "Mirror the mimed action or sign gesture for the food item.",
                        "Perform the movement cleanly with natural pacing."
                ],
                "animation": "/fsl-105-dataset/clips/92/0.mp4"
        },
        {
                "id": "lesson_93",
                "categoryId": "food",
                "title": "Hipon",
                "englishTitle": "Shrimp",
                "tagalogTitle": "Hipon",
                "description": "Sign the food item 'Shrimp' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand near the mouth or chest area as shown in the video.",
                        "Mirror the mimed action or sign gesture for the food item.",
                        "Perform the movement cleanly with natural pacing."
                ],
                "animation": "/fsl-105-dataset/clips/93/0.mp4"
        },
        {
                "id": "lesson_94",
                "categoryId": "food",
                "title": "Alimango",
                "englishTitle": "Crab",
                "tagalogTitle": "Alimango",
                "description": "Sign the food item 'Crab' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hand near the mouth or chest area as shown in the video.",
                        "Mirror the mimed action or sign gesture for the food item.",
                        "Perform the movement cleanly with natural pacing."
                ],
                "animation": "/fsl-105-dataset/clips/94/0.mp4"
        },
        {
                "id": "lesson_95",
                "categoryId": "drinks",
                "title": "Mainit",
                "englishTitle": "Hot",
                "tagalogTitle": "Mainit",
                "description": "Sign the beverage 'Hot' in Filipino Sign Language (FSL).",
                "steps": [
                        "Shape your hand to mimic holding a cup or the specific beverage gesture.",
                        "Follow the hand orientation and motion demonstrated in the video.",
                        "Perform the gesture smoothly and clearly."
                ],
                "animation": "/fsl-105-dataset/clips/95/0.mp4"
        },
        {
                "id": "lesson_96",
                "categoryId": "drinks",
                "title": "Malamig",
                "englishTitle": "Cold",
                "tagalogTitle": "Malamig",
                "description": "Sign the beverage 'Cold' in Filipino Sign Language (FSL).",
                "steps": [
                        "Shape your hand to mimic holding a cup or the specific beverage gesture.",
                        "Follow the hand orientation and motion demonstrated in the video.",
                        "Perform the gesture smoothly and clearly."
                ],
                "animation": "/fsl-105-dataset/clips/96/0.mp4"
        },
        {
                "id": "lesson_97",
                "categoryId": "drinks",
                "title": "Juice",
                "englishTitle": "Juice",
                "tagalogTitle": "Juice",
                "description": "Sign the beverage 'Juice' in Filipino Sign Language (FSL).",
                "steps": [
                        "Shape your hand to mimic holding a cup or the specific beverage gesture.",
                        "Follow the hand orientation and motion demonstrated in the video.",
                        "Perform the gesture smoothly and clearly."
                ],
                "animation": "/fsl-105-dataset/clips/97/0.mp4"
        },
        {
                "id": "lesson_98",
                "categoryId": "drinks",
                "title": "Gatas",
                "englishTitle": "Milk",
                "tagalogTitle": "Gatas",
                "description": "Sign the beverage 'Milk' in Filipino Sign Language (FSL).",
                "steps": [
                        "Shape your hand to mimic holding a cup or the specific beverage gesture.",
                        "Follow the hand orientation and motion demonstrated in the video.",
                        "Perform the gesture smoothly and clearly."
                ],
                "animation": "/fsl-105-dataset/clips/98/0.mp4"
        },
        {
                "id": "lesson_99",
                "categoryId": "drinks",
                "title": "Kape",
                "englishTitle": "Coffee",
                "tagalogTitle": "Kape",
                "description": "Sign the beverage 'Coffee' in Filipino Sign Language (FSL).",
                "steps": [
                        "Shape your hand to mimic holding a cup or the specific beverage gesture.",
                        "Follow the hand orientation and motion demonstrated in the video.",
                        "Perform the gesture smoothly and clearly."
                ],
                "animation": "/fsl-105-dataset/clips/99/0.mp4"
        },
        {
                "id": "lesson_100",
                "categoryId": "drinks",
                "title": "Tsaa",
                "englishTitle": "Tea",
                "tagalogTitle": "Tsaa",
                "description": "Sign the beverage 'Tea' in Filipino Sign Language (FSL).",
                "steps": [
                        "Shape your hand to mimic holding a cup or the specific beverage gesture.",
                        "Follow the hand orientation and motion demonstrated in the video.",
                        "Perform the gesture smoothly and clearly."
                ],
                "animation": "/fsl-105-dataset/clips/100/0.mp4"
        },
        {
                "id": "lesson_101",
                "categoryId": "drinks",
                "title": "Beer",
                "englishTitle": "Beer",
                "tagalogTitle": "Beer",
                "description": "Sign the beverage 'Beer' in Filipino Sign Language (FSL).",
                "steps": [
                        "Shape your hand to mimic holding a cup or the specific beverage gesture.",
                        "Follow the hand orientation and motion demonstrated in the video.",
                        "Perform the gesture smoothly and clearly."
                ],
                "animation": "/fsl-105-dataset/clips/101/0.mp4"
        },
        {
                "id": "lesson_102",
                "categoryId": "drinks",
                "title": "Alak",
                "englishTitle": "Wine",
                "tagalogTitle": "Alak",
                "description": "Sign the beverage 'Wine' in Filipino Sign Language (FSL).",
                "steps": [
                        "Shape your hand to mimic holding a cup or the specific beverage gesture.",
                        "Follow the hand orientation and motion demonstrated in the video.",
                        "Perform the gesture smoothly and clearly."
                ],
                "animation": "/fsl-105-dataset/clips/102/0.mp4"
        },
        {
                "id": "lesson_103",
                "categoryId": "drinks",
                "title": "Asukal",
                "englishTitle": "Sugar",
                "tagalogTitle": "Asukal",
                "description": "Sign the beverage 'Sugar' in Filipino Sign Language (FSL).",
                "steps": [
                        "Shape your hand to mimic holding a cup or the specific beverage gesture.",
                        "Follow the hand orientation and motion demonstrated in the video.",
                        "Perform the gesture smoothly and clearly."
                ],
                "animation": "/fsl-105-dataset/clips/103/0.mp4"
        },
        {
                "id": "lesson_104",
                "categoryId": "drinks",
                "title": "Walang Asukal",
                "englishTitle": "No Sugar",
                "tagalogTitle": "Walang Asukal",
                "description": "Sign the beverage 'No Sugar' in Filipino Sign Language (FSL).",
                "steps": [
                        "Shape your hand to mimic holding a cup or the specific beverage gesture.",
                        "Follow the hand orientation and motion demonstrated in the video.",
                        "Perform the gesture smoothly and clearly."
                ],
                "animation": "/fsl-105-dataset/clips/104/0.mp4"
        },
        {
                "id": "lesson_105",
                "categoryId": "alphabet",
                "title": "A",
                "englishTitle": "Letter A",
                "tagalogTitle": "Letrang A",
                "description": "Sign the letter 'A' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/A.png"
        },
        {
                "id": "lesson_106",
                "categoryId": "alphabet",
                "title": "B",
                "englishTitle": "Letter B",
                "tagalogTitle": "Letrang B",
                "description": "Sign the letter 'B' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/B.png"
        },
        {
                "id": "lesson_107",
                "categoryId": "alphabet",
                "title": "C",
                "englishTitle": "Letter C",
                "tagalogTitle": "Letrang C",
                "description": "Sign the letter 'C' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/C.png"
        },
        {
                "id": "lesson_108",
                "categoryId": "alphabet",
                "title": "D",
                "englishTitle": "Letter D",
                "tagalogTitle": "Letrang D",
                "description": "Sign the letter 'D' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/D.png"
        },
        {
                "id": "lesson_109",
                "categoryId": "alphabet",
                "title": "E",
                "englishTitle": "Letter E",
                "tagalogTitle": "Letrang E",
                "description": "Sign the letter 'E' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/E.png"
        },
        {
                "id": "lesson_110",
                "categoryId": "alphabet",
                "title": "F",
                "englishTitle": "Letter F",
                "tagalogTitle": "Letrang F",
                "description": "Sign the letter 'F' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/F.png"
        },
        {
                "id": "lesson_111",
                "categoryId": "alphabet",
                "title": "G",
                "englishTitle": "Letter G",
                "tagalogTitle": "Letrang G",
                "description": "Sign the letter 'G' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/G.png"
        },
        {
                "id": "lesson_112",
                "categoryId": "alphabet",
                "title": "H",
                "englishTitle": "Letter H",
                "tagalogTitle": "Letrang H",
                "description": "Sign the letter 'H' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/H.png"
        },
        {
                "id": "lesson_113",
                "categoryId": "alphabet",
                "title": "I",
                "englishTitle": "Letter I",
                "tagalogTitle": "Letrang I",
                "description": "Sign the letter 'I' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/I.png"
        },
        {
                "id": "lesson_114",
                "categoryId": "alphabet",
                "title": "J",
                "englishTitle": "Letter J",
                "tagalogTitle": "Letrang J",
                "description": "Sign the letter 'J' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/J.png"
        },
        {
                "id": "lesson_115",
                "categoryId": "alphabet",
                "title": "K",
                "englishTitle": "Letter K",
                "tagalogTitle": "Letrang K",
                "description": "Sign the letter 'K' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/K.png"
        },
        {
                "id": "lesson_116",
                "categoryId": "alphabet",
                "title": "L",
                "englishTitle": "Letter L",
                "tagalogTitle": "Letrang L",
                "description": "Sign the letter 'L' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/L.png"
        },
        {
                "id": "lesson_117",
                "categoryId": "alphabet",
                "title": "M",
                "englishTitle": "Letter M",
                "tagalogTitle": "Letrang M",
                "description": "Sign the letter 'M' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/M.png"
        },
        {
                "id": "lesson_118",
                "categoryId": "alphabet",
                "title": "N",
                "englishTitle": "Letter N",
                "tagalogTitle": "Letrang N",
                "description": "Sign the letter 'N' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/N.png"
        },
        {
                "id": "lesson_119",
                "categoryId": "alphabet",
                "title": "O",
                "englishTitle": "Letter O",
                "tagalogTitle": "Letrang O",
                "description": "Sign the letter 'O' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/O.png"
        },
        {
                "id": "lesson_120",
                "categoryId": "alphabet",
                "title": "P",
                "englishTitle": "Letter P",
                "tagalogTitle": "Letrang P",
                "description": "Sign the letter 'P' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/P.png"
        },
        {
                "id": "lesson_121",
                "categoryId": "alphabet",
                "title": "Q",
                "englishTitle": "Letter Q",
                "tagalogTitle": "Letrang Q",
                "description": "Sign the letter 'Q' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/Q.png"
        },
        {
                "id": "lesson_122",
                "categoryId": "alphabet",
                "title": "R",
                "englishTitle": "Letter R",
                "tagalogTitle": "Letrang R",
                "description": "Sign the letter 'R' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/R.png"
        },
        {
                "id": "lesson_123",
                "categoryId": "alphabet",
                "title": "S",
                "englishTitle": "Letter S",
                "tagalogTitle": "Letrang S",
                "description": "Sign the letter 'S' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/S.png"
        },
        {
                "id": "lesson_124",
                "categoryId": "alphabet",
                "title": "T",
                "englishTitle": "Letter T",
                "tagalogTitle": "Letrang T",
                "description": "Sign the letter 'T' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/T.png"
        },
        {
                "id": "lesson_125",
                "categoryId": "alphabet",
                "title": "U",
                "englishTitle": "Letter U",
                "tagalogTitle": "Letrang U",
                "description": "Sign the letter 'U' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/U.png"
        },
        {
                "id": "lesson_126",
                "categoryId": "alphabet",
                "title": "V",
                "englishTitle": "Letter V",
                "tagalogTitle": "Letrang V",
                "description": "Sign the letter 'V' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/V.png"
        },
        {
                "id": "lesson_127",
                "categoryId": "alphabet",
                "title": "W",
                "englishTitle": "Letter W",
                "tagalogTitle": "Letrang W",
                "description": "Sign the letter 'W' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/W.png"
        },
        {
                "id": "lesson_128",
                "categoryId": "alphabet",
                "title": "X",
                "englishTitle": "Letter X",
                "tagalogTitle": "Letrang X",
                "description": "Sign the letter 'X' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/X.png"
        },
        {
                "id": "lesson_129",
                "categoryId": "alphabet",
                "title": "Y",
                "englishTitle": "Letter Y",
                "tagalogTitle": "Letrang Y",
                "description": "Sign the letter 'Y' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/Y.png"
        },
        {
                "id": "lesson_130",
                "categoryId": "alphabet",
                "title": "Z",
                "englishTitle": "Letter Z",
                "tagalogTitle": "Letrang Z",
                "description": "Sign the letter 'Z' in the Filipino Sign Language (FSL) Alphabet.",
                "steps": [
                        "Position your dominant hand upright in front of your chest or shoulder.",
                        "Form the exact finger shape and thumb placement shown in the image.",
                        "Hold the hand shape static and clearly facing forward."
                ],
                "animation": "/fsl_alphabet_sign/fsl_alphabet_sign/Z.png"
        },
        {
                "id": "lesson_131",
                "categoryId": "animals",
                "title": "Ibon",
                "englishTitle": "Bird",
                "tagalogTitle": "Ibon",
                "description": "Sign the animal 'Bird' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant hand in front of your body or near the face.",
                        "Mirror the mimed characteristic or animal gesture shown in the video.",
                        "Execute the sign with clear hand movements."
                ],
                "animation": "/custom_fsl/Animals/Bird/bird_01.mp4"
        },
        {
                "id": "lesson_132",
                "categoryId": "animals",
                "title": "Pusa",
                "englishTitle": "Cat",
                "tagalogTitle": "Pusa",
                "description": "Sign the animal 'Cat' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant hand in front of your body or near the face.",
                        "Mirror the mimed characteristic or animal gesture shown in the video.",
                        "Execute the sign with clear hand movements."
                ],
                "animation": "/custom_fsl/Animals/Cat/cat_01.mp4"
        },
        {
                "id": "lesson_133",
                "categoryId": "animals",
                "title": "Aso",
                "englishTitle": "Dog",
                "tagalogTitle": "Aso",
                "description": "Sign the animal 'Dog' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant hand in front of your body or near the face.",
                        "Mirror the mimed characteristic or animal gesture shown in the video.",
                        "Execute the sign with clear hand movements."
                ],
                "animation": "/custom_fsl/Animals/Dog/dog_01.mp4"
        },
        {
                "id": "lesson_134",
                "categoryId": "animals",
                "title": "Kabayo",
                "englishTitle": "Horse",
                "tagalogTitle": "Kabayo",
                "description": "Sign the animal 'Horse' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant hand in front of your body or near the face.",
                        "Mirror the mimed characteristic or animal gesture shown in the video.",
                        "Execute the sign with clear hand movements."
                ],
                "animation": "/custom_fsl/Animals/Horse/horse_01.mp4"
        },
        {
                "id": "lesson_135",
                "categoryId": "animals",
                "title": "Baboy",
                "englishTitle": "Pig",
                "tagalogTitle": "Baboy",
                "description": "Sign the animal 'Pig' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant hand in front of your body or near the face.",
                        "Mirror the mimed characteristic or animal gesture shown in the video.",
                        "Execute the sign with clear hand movements."
                ],
                "animation": "/custom_fsl/Animals/Pig/pig_01.mp4"
        },
        {
                "id": "lesson_136",
                "categoryId": "body_parts",
                "title": "Tainga",
                "englishTitle": "Ears",
                "tagalogTitle": "Tainga",
                "description": "Sign the body part 'Ears' in Filipino Sign Language (FSL).",
                "steps": [
                        "Point toward or mimic the contour of the body part with your dominant hand.",
                        "Follow the exact handshape and placement demonstrated in the video.",
                        "Perform the motion with precision."
                ],
                "animation": "/custom_fsl/Body Parts/Ears/Ear_02.mp4"
        },
        {
                "id": "lesson_137",
                "categoryId": "body_parts",
                "title": "Mata",
                "englishTitle": "Eyes",
                "tagalogTitle": "Mata",
                "description": "Sign the body part 'Eyes' in Filipino Sign Language (FSL).",
                "steps": [
                        "Point toward or mimic the contour of the body part with your dominant hand.",
                        "Follow the exact handshape and placement demonstrated in the video.",
                        "Perform the motion with precision."
                ],
                "animation": "/custom_fsl/Body Parts/Eyes/Eye_03.mp4"
        },
        {
                "id": "lesson_138",
                "categoryId": "body_parts",
                "title": "Buhok",
                "englishTitle": "Hair",
                "tagalogTitle": "Buhok",
                "description": "Sign the body part 'Hair' in Filipino Sign Language (FSL).",
                "steps": [
                        "Point toward or mimic the contour of the body part with your dominant hand.",
                        "Follow the exact handshape and placement demonstrated in the video.",
                        "Perform the motion with precision."
                ],
                "animation": "/custom_fsl/Body Parts/Hair/Hair_01.mp4"
        },
        {
                "id": "lesson_139",
                "categoryId": "body_parts",
                "title": "Kamay",
                "englishTitle": "Hand",
                "tagalogTitle": "Kamay",
                "description": "Sign the body part 'Hand' in Filipino Sign Language (FSL).",
                "steps": [
                        "Point toward or mimic the contour of the body part with your dominant hand.",
                        "Follow the exact handshape and placement demonstrated in the video.",
                        "Perform the motion with precision."
                ],
                "animation": "/custom_fsl/Body Parts/Hand/Hand_01.mp4"
        },
        {
                "id": "lesson_140",
                "categoryId": "body_parts",
                "title": "Bibig",
                "englishTitle": "Mouth",
                "tagalogTitle": "Bibig",
                "description": "Sign the body part 'Mouth' in Filipino Sign Language (FSL).",
                "steps": [
                        "Point toward or mimic the contour of the body part with your dominant hand.",
                        "Follow the exact handshape and placement demonstrated in the video.",
                        "Perform the motion with precision."
                ],
                "animation": "/custom_fsl/Body Parts/Mouth/Mouth_01.mp4"
        },
        {
                "id": "lesson_141",
                "categoryId": "body_parts",
                "title": "Ilong",
                "englishTitle": "Nose",
                "tagalogTitle": "Ilong",
                "description": "Sign the body part 'Nose' in Filipino Sign Language (FSL).",
                "steps": [
                        "Point toward or mimic the contour of the body part with your dominant hand.",
                        "Follow the exact handshape and placement demonstrated in the video.",
                        "Perform the motion with precision."
                ],
                "animation": "/custom_fsl/Body Parts/Nose/Nose_01.mp4"
        },
        {
                "id": "lesson_142",
                "categoryId": "body_parts",
                "title": "Ngipin",
                "englishTitle": "Teeth",
                "tagalogTitle": "Ngipin",
                "description": "Sign the body part 'Teeth' in Filipino Sign Language (FSL).",
                "steps": [
                        "Point toward or mimic the contour of the body part with your dominant hand.",
                        "Follow the exact handshape and placement demonstrated in the video.",
                        "Perform the motion with precision."
                ],
                "animation": "/custom_fsl/Body Parts/Teeth/Teeth_01.mp4"
        },
        {
                "id": "lesson_143",
                "categoryId": "emotion",
                "title": "Galit",
                "englishTitle": "Angry",
                "tagalogTitle": "Galit",
                "description": "Express the emotion 'Angry' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hands relative to your chest or face as shown.",
                        "Replicate the dynamic hand movement indicating the emotional state.",
                        "Accompany the sign with appropriate facial expression."
                ],
                "animation": "/custom_fsl/Emotion/Angry/angry_01.mp4"
        },
        {
                "id": "lesson_144",
                "categoryId": "emotion",
                "title": "Masaya",
                "englishTitle": "Happy",
                "tagalogTitle": "Masaya",
                "description": "Express the emotion 'Happy' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hands relative to your chest or face as shown.",
                        "Replicate the dynamic hand movement indicating the emotional state.",
                        "Accompany the sign with appropriate facial expression."
                ],
                "animation": "/custom_fsl/Emotion/Happy/happy_01.mp4"
        },
        {
                "id": "lesson_145",
                "categoryId": "emotion",
                "title": "Malungkot",
                "englishTitle": "Sad",
                "tagalogTitle": "Malungkot",
                "description": "Express the emotion 'Sad' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hands relative to your chest or face as shown.",
                        "Replicate the dynamic hand movement indicating the emotional state.",
                        "Accompany the sign with appropriate facial expression."
                ],
                "animation": "/custom_fsl/Emotion/Sad/sad_01.mp4"
        },
        {
                "id": "lesson_146",
                "categoryId": "emotion",
                "title": "Takot",
                "englishTitle": "Scared",
                "tagalogTitle": "Takot",
                "description": "Express the emotion 'Scared' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hands relative to your chest or face as shown.",
                        "Replicate the dynamic hand movement indicating the emotional state.",
                        "Accompany the sign with appropriate facial expression."
                ],
                "animation": "/custom_fsl/Emotion/Scared/scared_01.mp4"
        },
        {
                "id": "lesson_147",
                "categoryId": "emotion",
                "title": "Mahiyain",
                "englishTitle": "Shy",
                "tagalogTitle": "Mahiyain",
                "description": "Express the emotion 'Shy' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your hands relative to your chest or face as shown.",
                        "Replicate the dynamic hand movement indicating the emotional state.",
                        "Accompany the sign with appropriate facial expression."
                ],
                "animation": "/custom_fsl/Emotion/Shy/shy_01.mp4"
        },
        {
                "id": "lesson_148",
                "categoryId": "fruits",
                "title": "Saging",
                "englishTitle": "Banana",
                "tagalogTitle": "Saging",
                "description": "Sign the fruit 'Banana' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the handshape representing the fruit's shape, texture, or eating motion.",
                        "Follow the movement path shown in the demonstration video.",
                        "Hold the sign cleanly for easy recognition."
                ],
                "animation": "/custom_fsl/Fruits/Banana/banana_01.mp4"
        },
        {
                "id": "lesson_149",
                "categoryId": "fruits",
                "title": "Niyog",
                "englishTitle": "Coconut",
                "tagalogTitle": "Niyog",
                "description": "Sign the fruit 'Coconut' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the handshape representing the fruit's shape, texture, or eating motion.",
                        "Follow the movement path shown in the demonstration video.",
                        "Hold the sign cleanly for easy recognition."
                ],
                "animation": "/custom_fsl/Fruits/Coconut/coconut_01.mp4"
        },
        {
                "id": "lesson_150",
                "categoryId": "fruits",
                "title": "Mangga",
                "englishTitle": "Mango",
                "tagalogTitle": "Mangga",
                "description": "Sign the fruit 'Mango' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the handshape representing the fruit's shape, texture, or eating motion.",
                        "Follow the movement path shown in the demonstration video.",
                        "Hold the sign cleanly for easy recognition."
                ],
                "animation": "/custom_fsl/Fruits/Mango/mango_01.mp4"
        },
        {
                "id": "lesson_151",
                "categoryId": "fruits",
                "title": "Pinya",
                "englishTitle": "Pineapple",
                "tagalogTitle": "Pinya",
                "description": "Sign the fruit 'Pineapple' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the handshape representing the fruit's shape, texture, or eating motion.",
                        "Follow the movement path shown in the demonstration video.",
                        "Hold the sign cleanly for easy recognition."
                ],
                "animation": "/custom_fsl/Fruits/Pineapple/pineapple_01.mp4"
        },
        {
                "id": "lesson_152",
                "categoryId": "fruits",
                "title": "Pakwan",
                "englishTitle": "Watermelon",
                "tagalogTitle": "Pakwan",
                "description": "Sign the fruit 'Watermelon' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the handshape representing the fruit's shape, texture, or eating motion.",
                        "Follow the movement path shown in the demonstration video.",
                        "Hold the sign cleanly for easy recognition."
                ],
                "animation": "/custom_fsl/Fruits/Watermelon/watermelon_01.mp4"
        },
        {
                "id": "lesson_153",
                "categoryId": "profession",
                "title": "Kusinero",
                "englishTitle": "Chef",
                "tagalogTitle": "Kusinero",
                "description": "Sign the profession 'Chef' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the occupational sign or tool-miming gesture with your hands.",
                        "Follow the specific trajectory and posture shown in the video.",
                        "Execute the sign clearly to communicate the vocation."
                ],
                "animation": "/custom_fsl/Profession/Chef/Chef_01.mp4"
        },
        {
                "id": "lesson_154",
                "categoryId": "profession",
                "title": "Doktor",
                "englishTitle": "Doctor",
                "tagalogTitle": "Doktor",
                "description": "Sign the profession 'Doctor' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the occupational sign or tool-miming gesture with your hands.",
                        "Follow the specific trajectory and posture shown in the video.",
                        "Execute the sign clearly to communicate the vocation."
                ],
                "animation": "/custom_fsl/Profession/Doctor/Doctor_01.mp4"
        },
        {
                "id": "lesson_155",
                "categoryId": "profession",
                "title": "Inhinyero",
                "englishTitle": "Engineer",
                "tagalogTitle": "Inhinyero",
                "description": "Sign the profession 'Engineer' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the occupational sign or tool-miming gesture with your hands.",
                        "Follow the specific trajectory and posture shown in the video.",
                        "Execute the sign clearly to communicate the vocation."
                ],
                "animation": "/custom_fsl/Profession/Engineer/Engineer_01.mp4"
        },
        {
                "id": "lesson_156",
                "categoryId": "profession",
                "title": "Bumbero",
                "englishTitle": "Firefighter",
                "tagalogTitle": "Bumbero",
                "description": "Sign the profession 'Firefighter' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the occupational sign or tool-miming gesture with your hands.",
                        "Follow the specific trajectory and posture shown in the video.",
                        "Execute the sign clearly to communicate the vocation."
                ],
                "animation": "/custom_fsl/Profession/Firefighter/Firefighter_01.mp4"
        },
        {
                "id": "lesson_157",
                "categoryId": "profession",
                "title": "Nars",
                "englishTitle": "Nurse",
                "tagalogTitle": "Nars",
                "description": "Sign the profession 'Nurse' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the occupational sign or tool-miming gesture with your hands.",
                        "Follow the specific trajectory and posture shown in the video.",
                        "Execute the sign clearly to communicate the vocation."
                ],
                "animation": "/custom_fsl/Profession/Nurse/Nurse_01.mp4"
        },
        {
                "id": "lesson_158",
                "categoryId": "profession",
                "title": "Tubero",
                "englishTitle": "Plumber",
                "tagalogTitle": "Tubero",
                "description": "Sign the profession 'Plumber' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the occupational sign or tool-miming gesture with your hands.",
                        "Follow the specific trajectory and posture shown in the video.",
                        "Execute the sign clearly to communicate the vocation."
                ],
                "animation": "/custom_fsl/Profession/Plumber/Plumber_01.mp4"
        },
        {
                "id": "lesson_159",
                "categoryId": "profession",
                "title": "Pulis",
                "englishTitle": "Police",
                "tagalogTitle": "Pulis",
                "description": "Sign the profession 'Police' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the occupational sign or tool-miming gesture with your hands.",
                        "Follow the specific trajectory and posture shown in the video.",
                        "Execute the sign clearly to communicate the vocation."
                ],
                "animation": "/custom_fsl/Profession/Police/Police_01.mp4"
        },
        {
                "id": "lesson_160",
                "categoryId": "profession",
                "title": "Punong-Guro",
                "englishTitle": "Principal",
                "tagalogTitle": "Punong-Guro",
                "description": "Sign the profession 'Principal' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the occupational sign or tool-miming gesture with your hands.",
                        "Follow the specific trajectory and posture shown in the video.",
                        "Execute the sign clearly to communicate the vocation."
                ],
                "animation": "/custom_fsl/Profession/Principal/Principal_01.mp4"
        },
        {
                "id": "lesson_161",
                "categoryId": "profession",
                "title": "Programmer",
                "englishTitle": "Programmer",
                "tagalogTitle": "Programmer",
                "description": "Sign the profession 'Programmer' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the occupational sign or tool-miming gesture with your hands.",
                        "Follow the specific trajectory and posture shown in the video.",
                        "Execute the sign clearly to communicate the vocation."
                ],
                "animation": "/custom_fsl/Profession/Programmer/Programmer_01.mp4"
        },
        {
                "id": "lesson_162",
                "categoryId": "profession",
                "title": "Guro",
                "englishTitle": "Teacher",
                "tagalogTitle": "Guro",
                "description": "Sign the profession 'Teacher' in Filipino Sign Language (FSL).",
                "steps": [
                        "Form the occupational sign or tool-miming gesture with your hands.",
                        "Follow the specific trajectory and posture shown in the video.",
                        "Execute the sign clearly to communicate the vocation."
                ],
                "animation": "/custom_fsl/Profession/Teacher/Teacher_01.mp4"
        },
        {
                "id": "lesson_163",
                "categoryId": "vegetables",
                "title": "Mais",
                "englishTitle": "Corn",
                "tagalogTitle": "Mais",
                "description": "Sign the vegetable 'Corn' in Filipino Sign Language (FSL).",
                "steps": [
                        "Shape your hand according to the vegetable's physical or culinary sign.",
                        "Follow the demonstration video for hand rotation and movement.",
                        "Perform the gesture smoothly and clearly."
                ],
                "animation": "/custom_fsl/Vegetables/Corn/corn_01.mp4"
        },
        {
                "id": "lesson_164",
                "categoryId": "vegetables",
                "title": "Pipino",
                "englishTitle": "Cucumber",
                "tagalogTitle": "Pipino",
                "description": "Sign the vegetable 'Cucumber' in Filipino Sign Language (FSL).",
                "steps": [
                        "Shape your hand according to the vegetable's physical or culinary sign.",
                        "Follow the demonstration video for hand rotation and movement.",
                        "Perform the gesture smoothly and clearly."
                ],
                "animation": "/custom_fsl/Vegetables/Cucumber/cucumber_01.mp4"
        },
        {
                "id": "lesson_165",
                "categoryId": "vegetables",
                "title": "Sibuyas",
                "englishTitle": "Onions",
                "tagalogTitle": "Sibuyas",
                "description": "Sign the vegetable 'Onions' in Filipino Sign Language (FSL).",
                "steps": [
                        "Shape your hand according to the vegetable's physical or culinary sign.",
                        "Follow the demonstration video for hand rotation and movement.",
                        "Perform the gesture smoothly and clearly."
                ],
                "animation": "/custom_fsl/Vegetables/Onions/onion_01.mp4"
        },
        {
                "id": "lesson_166",
                "categoryId": "vegetables",
                "title": "Patatas",
                "englishTitle": "Potato",
                "tagalogTitle": "Patatas",
                "description": "Sign the vegetable 'Potato' in Filipino Sign Language (FSL).",
                "steps": [
                        "Shape your hand according to the vegetable's physical or culinary sign.",
                        "Follow the demonstration video for hand rotation and movement.",
                        "Perform the gesture smoothly and clearly."
                ],
                "animation": "/custom_fsl/Vegetables/Potato/potato_01.mp4"
        },
        {
                "id": "lesson_167",
                "categoryId": "vegetables",
                "title": "Kamatis",
                "englishTitle": "Tomato",
                "tagalogTitle": "Kamatis",
                "description": "Sign the vegetable 'Tomato' in Filipino Sign Language (FSL).",
                "steps": [
                        "Shape your hand according to the vegetable's physical or culinary sign.",
                        "Follow the demonstration video for hand rotation and movement.",
                        "Perform the gesture smoothly and clearly."
                ],
                "animation": "/custom_fsl/Vegetables/Tomato/tomato_01.mp4"
        },
        {
                "id": "lesson_168",
                "categoryId": "transactional",
                "title": "Ulitin / Muli",
                "englishTitle": "Again",
                "tagalogTitle": "Ulitin / Muli",
                "description": "Sign the transaction term 'Ulitin / Muli' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/AGAIN"
        },
        {
                "id": "lesson_169",
                "categoryId": "transactional",
                "title": "Kard",
                "englishTitle": "Card",
                "tagalogTitle": "Kard",
                "description": "Sign the transaction term 'Kard' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/CARD"
        },
        {
                "id": "lesson_170",
                "categoryId": "transactional",
                "title": "Pera / Cash",
                "englishTitle": "Cash",
                "tagalogTitle": "Pera / Cash",
                "description": "Sign the transaction term 'Pera / Cash' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/CASH"
        },
        {
                "id": "lesson_171",
                "categoryId": "transactional",
                "title": "Barya",
                "englishTitle": "Coin",
                "tagalogTitle": "Barya",
                "description": "Sign the transaction term 'Barya' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/COIN"
        },
        {
                "id": "lesson_172",
                "categoryId": "transactional",
                "title": "Diskwento",
                "englishTitle": "Discount",
                "tagalogTitle": "Diskwento",
                "description": "Sign the transaction term 'Diskwento' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/DISCOUNT"
        },
        {
                "id": "lesson_173",
                "categoryId": "transactional",
                "title": "Walo",
                "englishTitle": "Eight",
                "tagalogTitle": "Walo",
                "description": "Sign the transaction term 'Walo' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/EIGHT"
        },
        {
                "id": "lesson_174",
                "categoryId": "transactional",
                "title": "Lima",
                "englishTitle": "Five",
                "tagalogTitle": "Lima",
                "description": "Sign the transaction term 'Lima' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/FIVE"
        },
        {
                "id": "lesson_175",
                "categoryId": "transactional",
                "title": "Apat",
                "englishTitle": "Four",
                "tagalogTitle": "Apat",
                "description": "Sign the transaction term 'Apat' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/FOUR"
        },
        {
                "id": "lesson_176",
                "categoryId": "transactional",
                "title": "Hello / Kamusta",
                "englishTitle": "Hello",
                "tagalogTitle": "Hello / Kamusta",
                "description": "Sign the transaction term 'Hello / Kamusta' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/HELLO"
        },
        {
                "id": "lesson_177",
                "categoryId": "transactional",
                "title": "Ilan",
                "englishTitle": "How Many",
                "tagalogTitle": "Ilan",
                "description": "Sign the transaction term 'Ilan' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/HOW_MANY"
        },
        {
                "id": "lesson_178",
                "categoryId": "transactional",
                "title": "Magkano",
                "englishTitle": "How Much",
                "tagalogTitle": "Magkano",
                "description": "Sign the transaction term 'Magkano' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/HOW_MUCH"
        },
        {
                "id": "lesson_179",
                "categoryId": "transactional",
                "title": "Siyam",
                "englishTitle": "Nine",
                "tagalogTitle": "Siyam",
                "description": "Sign the transaction term 'Siyam' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/NINE"
        },
        {
                "id": "lesson_180",
                "categoryId": "transactional",
                "title": "Hindi",
                "englishTitle": "No",
                "tagalogTitle": "Hindi",
                "description": "Sign the transaction term 'Hindi' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/NO"
        },
        {
                "id": "lesson_181",
                "categoryId": "transactional",
                "title": "Isa",
                "englishTitle": "One",
                "tagalogTitle": "Isa",
                "description": "Sign the transaction term 'Isa' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/ONE"
        },
        {
                "id": "lesson_182",
                "categoryId": "transactional",
                "title": "Pakiusap",
                "englishTitle": "Please",
                "tagalogTitle": "Pakiusap",
                "description": "Sign the transaction term 'Pakiusap' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/PLEASE"
        },
        {
                "id": "lesson_183",
                "categoryId": "transactional",
                "title": "Problema",
                "englishTitle": "Problem",
                "tagalogTitle": "Problema",
                "description": "Sign the transaction term 'Problema' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/PROBLEM"
        },
        {
                "id": "lesson_184",
                "categoryId": "transactional",
                "title": "Resibo",
                "englishTitle": "Receipt",
                "tagalogTitle": "Resibo",
                "description": "Sign the transaction term 'Resibo' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/RECEIPT"
        },
        {
                "id": "lesson_185",
                "categoryId": "transactional",
                "title": "Pito",
                "englishTitle": "Seven",
                "tagalogTitle": "Pito",
                "description": "Sign the transaction term 'Pito' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/SEVEN"
        },
        {
                "id": "lesson_186",
                "categoryId": "transactional",
                "title": "Anim",
                "englishTitle": "Six",
                "tagalogTitle": "Anim",
                "description": "Sign the transaction term 'Anim' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/SIX"
        },
        {
                "id": "lesson_187",
                "categoryId": "transactional",
                "title": "Sampu",
                "englishTitle": "Ten",
                "tagalogTitle": "Sampu",
                "description": "Sign the transaction term 'Sampu' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/TEN"
        },
        {
                "id": "lesson_188",
                "categoryId": "transactional",
                "title": "Salamat",
                "englishTitle": "Thank You",
                "tagalogTitle": "Salamat",
                "description": "Sign the transaction term 'Salamat' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/THANK_YOU"
        },
        {
                "id": "lesson_189",
                "categoryId": "transactional",
                "title": "Tatlo",
                "englishTitle": "Three",
                "tagalogTitle": "Tatlo",
                "description": "Sign the transaction term 'Tatlo' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/THREE"
        },
        {
                "id": "lesson_190",
                "categoryId": "transactional",
                "title": "Dalawa",
                "englishTitle": "Two",
                "tagalogTitle": "Dalawa",
                "description": "Sign the transaction term 'Dalawa' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/TWO"
        },
        {
                "id": "lesson_191",
                "categoryId": "transactional",
                "title": "Sandali / Hintay",
                "englishTitle": "Wait",
                "tagalogTitle": "Sandali / Hintay",
                "description": "Sign the transaction term 'Sandali / Hintay' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/WAIT"
        },
        {
                "id": "lesson_192",
                "categoryId": "transactional",
                "title": "Walang Anuman",
                "englishTitle": "Welcome",
                "tagalogTitle": "Walang Anuman",
                "description": "Sign the transaction term 'Walang Anuman' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/WELCOME"
        },
        {
                "id": "lesson_193",
                "categoryId": "transactional",
                "title": "Oo",
                "englishTitle": "Yes",
                "tagalogTitle": "Oo",
                "description": "Sign the transaction term 'Oo' in Filipino Sign Language (FSL).",
                "steps": [
                        "Position your dominant or both hands at chest level.",
                        "Execute the clear transactional motion (e.g. paying, receiving, counting).",
                        "Maintain polite, professional facial expression and hand clarity."
                ],
                "animation": "/transactional/recorded_data/YES"
        },
        {
                "id": "lesson_194",
                "categoryId": "adjective",
                "title": "Masama",
                "englishTitle": "Bad",
                "tagalogTitle": "Masama",
                "description": "Sign the word 'Bad' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Adjective/Bad/bad_01.mp4"
        },
        {
                "id": "lesson_195",
                "categoryId": "adjective",
                "title": "Maganda",
                "englishTitle": "Beautiful",
                "tagalogTitle": "Maganda",
                "description": "Sign the word 'Beautiful' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Adjective/Beautiful/beautiful_01.mp4"
        },
        {
                "id": "lesson_196",
                "categoryId": "adjective",
                "title": "Mabuti",
                "englishTitle": "Good",
                "tagalogTitle": "Mabuti",
                "description": "Sign the word 'Good' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Adjective/Good/good_01.mp4"
        },
        {
                "id": "lesson_197",
                "categoryId": "adjective",
                "title": "Masaya",
                "englishTitle": "Happy",
                "tagalogTitle": "Masaya",
                "description": "Sign the word 'Happy' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Adjective/Happy/happy_01.mp4"
        },
        {
                "id": "lesson_198",
                "categoryId": "adjective",
                "title": "Pangit",
                "englishTitle": "Ugly",
                "tagalogTitle": "Pangit",
                "description": "Sign the word 'Ugly' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Adjective/Ugly/ugly_01.mp4"
        },
        {
                "id": "lesson_199",
                "categoryId": "bible",
                "title": "Adan",
                "englishTitle": "Adam",
                "tagalogTitle": "Adan",
                "description": "Sign the word 'Adam' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Bible/Adam/adam_01.mp4"
        },
        {
                "id": "lesson_200",
                "categoryId": "bible",
                "title": "Eba",
                "englishTitle": "Eve",
                "tagalogTitle": "Eba",
                "description": "Sign the word 'Eve' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Bible/Eve/eve_01.mp4"
        },
        {
                "id": "lesson_201",
                "categoryId": "bible",
                "title": "Diyos",
                "englishTitle": "God",
                "tagalogTitle": "Diyos",
                "description": "Sign the word 'God' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Bible/God/God_01.mp4"
        },
        {
                "id": "lesson_202",
                "categoryId": "bible",
                "title": "Hesus",
                "englishTitle": "Jesus",
                "tagalogTitle": "Hesus",
                "description": "Sign the word 'Jesus' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Bible/Jesus/jesus_01.mp4"
        },
        {
                "id": "lesson_203",
                "categoryId": "bible",
                "title": "Maria",
                "englishTitle": "Mary",
                "tagalogTitle": "Maria",
                "description": "Sign the word 'Mary' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Bible/Mary/Mary_01.mp4"
        },
        {
                "id": "lesson_204",
                "categoryId": "places",
                "title": "Banyo",
                "englishTitle": "Bathroom",
                "tagalogTitle": "Banyo",
                "description": "Sign the word 'Bathroom' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Places/Bathroom/bathroom_01.mp4"
        },
        {
                "id": "lesson_205",
                "categoryId": "places",
                "title": "Simbahan",
                "englishTitle": "Church",
                "tagalogTitle": "Simbahan",
                "description": "Sign the word 'Church' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Places/Church/church_01.mp4"
        },
        {
                "id": "lesson_206",
                "categoryId": "places",
                "title": "Tahanan",
                "englishTitle": "Home",
                "tagalogTitle": "Tahanan",
                "description": "Sign the word 'Home' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Places/Home/home_01.mp4"
        },
        {
                "id": "lesson_207",
                "categoryId": "places",
                "title": "Ospital",
                "englishTitle": "Hospital",
                "tagalogTitle": "Ospital",
                "description": "Sign the word 'Hospital' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Places/Hospital/hospital_01.mp4"
        },
        {
                "id": "lesson_208",
                "categoryId": "places",
                "title": "Paaralan",
                "englishTitle": "School",
                "tagalogTitle": "Paaralan",
                "description": "Sign the word 'School' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Places/School/school_01.mp4"
        },
        {
                "id": "lesson_209",
                "categoryId": "prepositions",
                "title": "Itaas",
                "englishTitle": "Above",
                "tagalogTitle": "Itaas",
                "description": "Sign the word 'Above' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Prepositions/Above/above_01.mp4"
        },
        {
                "id": "lesson_210",
                "categoryId": "prepositions",
                "title": "Bago",
                "englishTitle": "Before",
                "tagalogTitle": "Bago",
                "description": "Sign the word 'Before' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Prepositions/Before/before_01.mp4"
        },
        {
                "id": "lesson_211",
                "categoryId": "prepositions",
                "title": "Likod",
                "englishTitle": "Behind",
                "tagalogTitle": "Likod",
                "description": "Sign the word 'Behind' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Prepositions/Behind/behind_01.mp4"
        },
        {
                "id": "lesson_212",
                "categoryId": "prepositions",
                "title": "Loob",
                "englishTitle": "Inside",
                "tagalogTitle": "Loob",
                "description": "Sign the word 'Inside' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Prepositions/Inside/inside_01.mp4"
        },
        {
                "id": "lesson_213",
                "categoryId": "prepositions",
                "title": "Labas",
                "englishTitle": "Outside",
                "tagalogTitle": "Labas",
                "description": "Sign the word 'Outside' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Prepositions/Outside/outside_01.mp4"
        },
        {
                "id": "lesson_214",
                "categoryId": "verb",
                "title": "Kain",
                "englishTitle": "Eat",
                "tagalogTitle": "Kain",
                "description": "Sign the word 'Eat' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Verb/Eat/eat_01.mp4"
        },
        {
                "id": "lesson_215",
                "categoryId": "verb",
                "title": "Tulong",
                "englishTitle": "Help",
                "tagalogTitle": "Tulong",
                "description": "Sign the word 'Help' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Verb/Help/help_01.mp4"
        },
        {
                "id": "lesson_216",
                "categoryId": "verb",
                "title": "Kailangan",
                "englishTitle": "Need",
                "tagalogTitle": "Kailangan",
                "description": "Sign the word 'Need' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Verb/Need/need_01.mp4"
        },
        {
                "id": "lesson_217",
                "categoryId": "verb",
                "title": "Maghintay",
                "englishTitle": "Wait",
                "tagalogTitle": "Maghintay",
                "description": "Sign the word 'Wait' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Verb/Wait/wait_01.mp4"
        },
        {
                "id": "lesson_218",
                "categoryId": "verb",
                "title": "Gusto",
                "englishTitle": "Want",
                "tagalogTitle": "Gusto",
                "description": "Sign the word 'Want' in Filipino Sign Language (FSL).",
                "steps": [
                        "Raise your dominant hand to initiate the sign.",
                        "Mirror the hand movement and facial expression shown in the video.",
                        "Face your palm outward toward the viewer with a clear gesture."
                ],
                "animation": "/additional-sl/Verb/Want/want_01.mp4"
        },
        {
                "id": "lesson_219", "categoryId": "animals", "title": "Chicken", "englishTitle": "Chicken", "tagalogTitle": "Manok",
                "description": "Sign the animal 'Chicken' in Filipino Sign Language (FSL).",
                "steps": ["Position your dominant hand in front of your body or near the face.", "Mirror the mimed characteristic or animal gesture shown in the video.", "Execute the sign with clear hand movements."],
                "animation": "/custom_fsl/Animals/chicken/chicken_01.mp4"
        },
        {
                "id": "lesson_220", "categoryId": "animals", "title": "Cow", "englishTitle": "Cow", "tagalogTitle": "Baka",
                "description": "Sign the animal 'Cow' in Filipino Sign Language (FSL).",
                "steps": ["Position your dominant hand in front of your body or near the face.", "Mirror the mimed characteristic or animal gesture shown in the video.", "Execute the sign with clear hand movements."],
                "animation": "/custom_fsl/Animals/cow/cow_01.mp4"
        },
        {
                "id": "lesson_221", "categoryId": "animals", "title": "Fish", "englishTitle": "Fish", "tagalogTitle": "Isda",
                "description": "Sign the animal 'Fish' in Filipino Sign Language (FSL).",
                "steps": ["Position your dominant hand in front of your body or near the face.", "Mirror the mimed characteristic or animal gesture shown in the video.", "Execute the sign with clear hand movements."],
                "animation": "/custom_fsl/Animals/fish/fish_01.mp4"
        },
        {
                "id": "lesson_222", "categoryId": "animals", "title": "Monkey", "englishTitle": "Monkey", "tagalogTitle": "Unggoy",
                "description": "Sign the animal 'Monkey' in Filipino Sign Language (FSL).",
                "steps": ["Position your dominant hand in front of your body or near the face.", "Mirror the mimed characteristic or animal gesture shown in the video.", "Execute the sign with clear hand movements."],
                "animation": "/custom_fsl/Animals/monkey/monkey_01.mp4"
        },
        {
                "id": "lesson_223", "categoryId": "animals", "title": "Owl", "englishTitle": "Owl", "tagalogTitle": "Kuwago",
                "description": "Sign the animal 'Owl' in Filipino Sign Language (FSL).",
                "steps": ["Position your dominant hand in front of your body or near the face.", "Mirror the mimed characteristic or animal gesture shown in the video.", "Execute the sign with clear hand movements."],
                "animation": "/custom_fsl/Animals/owl/owl_01.mp4"
        },
        {
                "id": "lesson_224", "categoryId": "emotion", "title": "Afraid", "englishTitle": "Afraid", "tagalogTitle": "Natatakot",
                "description": "Express the emotion 'Afraid' in Filipino Sign Language (FSL).",
                "steps": ["Position your hands relative to your chest or face as shown.", "Replicate the dynamic hand movement indicating the emotional state.", "Accompany the sign with appropriate facial expression."],
                "animation": "/custom_fsl/Emotion/afraid/afraid_01.mp4"
        },
        {
                "id": "lesson_225", "categoryId": "emotion", "title": "Confused", "englishTitle": "Confused", "tagalogTitle": "Nalilito",
                "description": "Express the emotion 'Confused' in Filipino Sign Language (FSL).",
                "steps": ["Position your hands relative to your chest or face as shown.", "Replicate the dynamic hand movement indicating the emotional state.", "Accompany the sign with appropriate facial expression."],
                "animation": "/custom_fsl/Emotion/confused/confused_01.mp4"
        },
        {
                "id": "lesson_226", "categoryId": "emotion", "title": "Excited", "englishTitle": "Excited", "tagalogTitle": "Nasasabik",
                "description": "Express the emotion 'Excited' in Filipino Sign Language (FSL).",
                "steps": ["Position your hands relative to your chest or face as shown.", "Replicate the dynamic hand movement indicating the emotional state.", "Accompany the sign with appropriate facial expression."],
                "animation": "/custom_fsl/Emotion/excited/excited_01.mp4"
        },
        {
                "id": "lesson_227", "categoryId": "emotion", "title": "Tired", "englishTitle": "Tired", "tagalogTitle": "Pagod",
                "description": "Express the emotion 'Tired' in Filipino Sign Language (FSL).",
                "steps": ["Position your hands relative to your chest or face as shown.", "Replicate the dynamic hand movement indicating the emotional state.", "Accompany the sign with appropriate facial expression."],
                "animation": "/custom_fsl/Emotion/tired/tired_01.mp4"
        },
        {
                "id": "lesson_228", "categoryId": "emotion", "title": "Upset", "englishTitle": "Upset", "tagalogTitle": "Naiinis",
                "description": "Express the emotion 'Upset' in Filipino Sign Language (FSL).",
                "steps": ["Position your hands relative to your chest or face as shown.", "Replicate the dynamic hand movement indicating the emotional state.", "Accompany the sign with appropriate facial expression."],
                "animation": "/custom_fsl/Emotion/upset/upset_01.mp4"
        },
        {
                "id": "lesson_229", "categoryId": "fruits", "title": "Apple", "englishTitle": "Apple", "tagalogTitle": "Mansanas",
                "description": "Sign the fruit 'Apple' in Filipino Sign Language (FSL).",
                "steps": ["Form the handshape representing the fruit's shape, texture, or eating motion.", "Follow the movement path shown in the demonstration video.", "Hold the sign cleanly for easy recognition."],
                "animation": "/custom_fsl/Fruits/apple/apple_01.mp4"
        },
        {
                "id": "lesson_230", "categoryId": "fruits", "title": "Cherry", "englishTitle": "Cherry", "tagalogTitle": "Seresa",
                "description": "Sign the fruit 'Cherry' in Filipino Sign Language (FSL).",
                "steps": ["Form the handshape representing the fruit's shape, texture, or eating motion.", "Follow the movement path shown in the demonstration video.", "Hold the sign cleanly for easy recognition."],
                "animation": "/custom_fsl/Fruits/cherry/cherry_01.mp4"
        },
        {
                "id": "lesson_231", "categoryId": "fruits", "title": "Grapes", "englishTitle": "Grapes", "tagalogTitle": "Ubas",
                "description": "Sign the fruit 'Grapes' in Filipino Sign Language (FSL).",
                "steps": ["Form the handshape representing the fruit's shape, texture, or eating motion.", "Follow the movement path shown in the demonstration video.", "Hold the sign cleanly for easy recognition."],
                "animation": "/custom_fsl/Fruits/grapes/grapes_01.mp4"
        },
        {
                "id": "lesson_232", "categoryId": "fruits", "title": "Lemon", "englishTitle": "Lemon", "tagalogTitle": "Limon",
                "description": "Sign the fruit 'Lemon' in Filipino Sign Language (FSL).",
                "steps": ["Form the handshape representing the fruit's shape, texture, or eating motion.", "Follow the movement path shown in the demonstration video.", "Hold the sign cleanly for easy recognition."],
                "animation": "/custom_fsl/Fruits/lemon/lemon_01.mp4"
        },
        {
                "id": "lesson_233", "categoryId": "fruits", "title": "Strawberry", "englishTitle": "Strawberry", "tagalogTitle": "Presa",
                "description": "Sign the fruit 'Strawberry' in Filipino Sign Language (FSL).",
                "steps": ["Form the handshape representing the fruit's shape, texture, or eating motion.", "Follow the movement path shown in the demonstration video.", "Hold the sign cleanly for easy recognition."],
                "animation": "/custom_fsl/Fruits/strawberry/strawberry_01.mp4"
        },
        {
                "id": "lesson_234", "categoryId": "vegetables", "title": "Broccoli", "englishTitle": "Broccoli", "tagalogTitle": "Brokoli",
                "description": "Sign the vegetable 'Broccoli' in Filipino Sign Language (FSL).",
                "steps": ["Shape your hand according to the vegetable's physical or culinary sign.", "Follow the demonstration video for hand rotation and movement.", "Perform the gesture smoothly and clearly."],
                "animation": "/custom_fsl/Vegetables/broccoli/broccoli_01.mp4"
        },
        {
                "id": "lesson_235", "categoryId": "vegetables", "title": "Carrots", "englishTitle": "Carrots", "tagalogTitle": "Karot",
                "description": "Sign the vegetable 'Carrots' in Filipino Sign Language (FSL).",
                "steps": ["Shape your hand according to the vegetable's physical or culinary sign.", "Follow the demonstration video for hand rotation and movement.", "Perform the gesture smoothly and clearly."],
                "animation": "/custom_fsl/Vegetables/carrots/carrot_01.mp4"
        },
        {
                "id": "lesson_236", "categoryId": "vegetables", "title": "Lettuce", "englishTitle": "Lettuce", "tagalogTitle": "Letsugas",
                "description": "Sign the vegetable 'Lettuce' in Filipino Sign Language (FSL).",
                "steps": ["Shape your hand according to the vegetable's physical or culinary sign.", "Follow the demonstration video for hand rotation and movement.", "Perform the gesture smoothly and clearly."],
                "animation": "/custom_fsl/Vegetables/lettuce/lettuce_01.mp4"
        },
        {
                "id": "lesson_237", "categoryId": "adjective", "title": "Big", "englishTitle": "Big", "tagalogTitle": "Malaki",
                "description": "Sign the word 'Big' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Adjective/big/big_01.mp4"
        },
        {
                "id": "lesson_238", "categoryId": "adjective", "title": "Cold", "englishTitle": "Cold", "tagalogTitle": "Malamig",
                "description": "Sign the word 'Cold' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Adjective/cold/cold_01.mp4"
        },
        {
                "id": "lesson_239", "categoryId": "adjective", "title": "Easy", "englishTitle": "Easy", "tagalogTitle": "Madali",
                "description": "Sign the word 'Easy' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Adjective/easy/easy_01.mp4"
        },
        {
                "id": "lesson_240", "categoryId": "adjective", "title": "Hard", "englishTitle": "Hard", "tagalogTitle": "Mahirap",
                "description": "Sign the word 'Hard' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Adjective/hard/hard_01.mp4"
        },
        {
                "id": "lesson_241", "categoryId": "adjective", "title": "Sad", "englishTitle": "Sad", "tagalogTitle": "Malungkot",
                "description": "Sign the word 'Sad' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Adjective/sad/sad_01.mp4"
        },
        {
                "id": "lesson_242", "categoryId": "bible", "title": "Abraham", "englishTitle": "Abraham", "tagalogTitle": "Abraham",
                "description": "Sign the word 'Abraham' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Bible/abraham/abraham_01.mp4"
        },
        {
                "id": "lesson_243", "categoryId": "bible", "title": "Amen", "englishTitle": "Amen", "tagalogTitle": "Amen",
                "description": "Sign the word 'Amen' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Bible/amen/amen_01.mp4"
        },
        {
                "id": "lesson_244", "categoryId": "bible", "title": "Bible", "englishTitle": "Bible", "tagalogTitle": "Bibliya",
                "description": "Sign the word 'Bible' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Bible/bible/bible_01.mp4"
        },
        {
                "id": "lesson_245", "categoryId": "bible", "title": "Isaac", "englishTitle": "Isaac", "tagalogTitle": "Isaac",
                "description": "Sign the word 'Isaac' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Bible/isaac/isaac_01.mp4"
        },
        {
                "id": "lesson_246", "categoryId": "bible", "title": "Noah", "englishTitle": "Noah", "tagalogTitle": "Noah",
                "description": "Sign the word 'Noah' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Bible/noah/noah_01.mp4"
        },
        {
                "id": "lesson_247", "categoryId": "places", "title": "Classroom", "englishTitle": "Classroom", "tagalogTitle": "Silid-aralan",
                "description": "Sign the word 'Classroom' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Places/classroom/classroom_01.mp4"
        },
        {
                "id": "lesson_248", "categoryId": "places", "title": "Library", "englishTitle": "Library", "tagalogTitle": "Aklatan",
                "description": "Sign the word 'Library' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Places/library/library_01.mp4"
        },
        {
                "id": "lesson_249", "categoryId": "places", "title": "Office", "englishTitle": "Office", "tagalogTitle": "Opisina",
                "description": "Sign the word 'Office' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Places/office/office_01.mp4"
        },
        {
                "id": "lesson_250", "categoryId": "places", "title": "Restaurant", "englishTitle": "Restaurant", "tagalogTitle": "Restawran",
                "description": "Sign the word 'Restaurant' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Places/restaurant/restaurant_01.mp4"
        },
        {
                "id": "lesson_251", "categoryId": "places", "title": "Store", "englishTitle": "Store", "tagalogTitle": "Tindahan",
                "description": "Sign the word 'Store' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Places/store/store_01.mp4"
        },
        {
                "id": "lesson_252", "categoryId": "prepositions", "title": "After", "englishTitle": "After", "tagalogTitle": "Pagkatapos",
                "description": "Sign the word 'After' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Prepositions/after/after_01.mp4"
        },
        {
                "id": "lesson_253", "categoryId": "prepositions", "title": "Around", "englishTitle": "Around", "tagalogTitle": "Paligid",
                "description": "Sign the word 'Around' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Prepositions/around/around_01.mp4"
        },
        {
                "id": "lesson_254", "categoryId": "prepositions", "title": "From", "englishTitle": "From", "tagalogTitle": "Mula",
                "description": "Sign the word 'From' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Prepositions/from/from_01.mp4"
        },
        {
                "id": "lesson_255", "categoryId": "prepositions", "title": "Near", "englishTitle": "Near", "tagalogTitle": "Malapit",
                "description": "Sign the word 'Near' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Prepositions/near/near_01.mp4"
        },
        {
                "id": "lesson_256", "categoryId": "prepositions", "title": "With", "englishTitle": "With", "tagalogTitle": "Kasama",
                "description": "Sign the word 'With' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Prepositions/with/with_01.mp4"
        },
        {
                "id": "lesson_257", "categoryId": "verb", "title": "Come", "englishTitle": "Come", "tagalogTitle": "Halika",
                "description": "Sign the word 'Come' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Verb/come/come_01.mp4"
        },
        {
                "id": "lesson_258", "categoryId": "verb", "title": "Drink", "englishTitle": "Drink", "tagalogTitle": "Uminom",
                "description": "Sign the word 'Drink' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Verb/drink/drink_01.mp4"
        },
        {
                "id": "lesson_259", "categoryId": "verb", "title": "Learn", "englishTitle": "Learn", "tagalogTitle": "Matuto",
                "description": "Sign the word 'Learn' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Verb/learn/learn_01.mp4"
        },
        {
                "id": "lesson_260", "categoryId": "verb", "title": "Like", "englishTitle": "Like", "tagalogTitle": "Gusto",
                "description": "Sign the word 'Like' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Verb/like/like_01.mp4"
        },
        {
                "id": "lesson_261", "categoryId": "verb", "title": "Sleep", "englishTitle": "Sleep", "tagalogTitle": "Matulog",
                "description": "Sign the word 'Sleep' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/Verb/sleep/sleep_01.mp4"
        },
        {
                "id": "lesson_262", "categoryId": "body_parts", "title": "Arm", "englishTitle": "Arm", "tagalogTitle": "Braso",
                "description": "Sign the body part 'Arm' in Filipino Sign Language (FSL).",
                "steps": [
                        "Point toward or mimic the contour of the body part with your dominant hand.",
                        "Follow the exact handshape and placement demonstrated in the video.",
                        "Perform the motion with precision."
                ],
                "animation": "/custom_fsl/Body Parts/arm/arm_01.mp4"
        },
        {
                "id": "lesson_263", "categoryId": "body_parts", "title": "Finger", "englishTitle": "Finger", "tagalogTitle": "Daliri",
                "description": "Sign the body part 'Finger' in Filipino Sign Language (FSL).",
                "steps": [
                        "Point toward or mimic the contour of the body part with your dominant hand.",
                        "Follow the exact handshape and placement demonstrated in the video.",
                        "Perform the motion with precision."
                ],
                "animation": "/custom_fsl/Body Parts/finger/finger_01.mp4"
        },
        {
                "id": "lesson_264", "categoryId": "body_parts", "title": "Head", "englishTitle": "Head", "tagalogTitle": "Ulo",
                "description": "Sign the body part 'Head' in Filipino Sign Language (FSL).",
                "steps": [
                        "Point toward or mimic the contour of the body part with your dominant hand.",
                        "Follow the exact handshape and placement demonstrated in the video.",
                        "Perform the motion with precision."
                ],
                "animation": "/custom_fsl/Body Parts/head/head_01.mp4"
        },
        {
                "id": "lesson_265", "categoryId": "vegetables", "title": "Pea", "englishTitle": "Pea", "tagalogTitle": "Gisantes",
                "description": "Sign the vegetable 'Pea' in Filipino Sign Language (FSL).",
                "steps": [
                        "Shape your hand according to the vegetable's physical or culinary sign.",
                        "Follow the demonstration video for hand rotation and movement.",
                        "Perform the gesture smoothly and clearly."
                ],
                "animation": "/custom_fsl/Vegetables/pea/pea_01.mp4"
        },
        {
                "id": "lesson_266", "categoryId": "pronouns", "title": "I", "englishTitle": "I", "tagalogTitle": "Ako",
                "description": "Sign the word 'I' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/pronouns/I/i_01.mp4"
        },
        {
                "id": "lesson_267", "categoryId": "pronouns", "title": "My", "englishTitle": "My", "tagalogTitle": "Akin",
                "description": "Sign the word 'My' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/pronouns/my/my_01.mp4"
        },
        {
                "id": "lesson_268", "categoryId": "pronouns", "title": "You", "englishTitle": "You", "tagalogTitle": "Ikaw",
                "description": "Sign the word 'You' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/pronouns/you/you_01.mp4"
        },
        {
                "id": "lesson_269", "categoryId": "pronouns", "title": "Your", "englishTitle": "Your", "tagalogTitle": "Iyo",
                "description": "Sign the word 'Your' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/pronouns/your/your_01.mp4"
        },
        {
                "id": "lesson_270", "categoryId": "pronouns", "title": "He", "englishTitle": "He", "tagalogTitle": "Siya (lalaki)",
                "description": "Sign the word 'He' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/pronouns/he/he_01.mp4"
        },
        {
                "id": "lesson_271", "categoryId": "pronouns", "title": "She", "englishTitle": "She", "tagalogTitle": "Siya (babae)",
                "description": "Sign the word 'She' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/pronouns/she/she_01.mp4"
        },
        {
                "id": "lesson_272", "categoryId": "pronouns", "title": "Our", "englishTitle": "Our", "tagalogTitle": "Amin",
                "description": "Sign the word 'Our' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/pronouns/our/our_01.mp4"
        },
        {
                "id": "lesson_273", "categoryId": "pronouns", "title": "They", "englishTitle": "They", "tagalogTitle": "Sila",
                "description": "Sign the word 'They' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/pronouns/they/they_01.mp4"
        },
        {
                "id": "lesson_274", "categoryId": "hygiene", "title": "Bath", "englishTitle": "Bath", "tagalogTitle": "Paligo",
                "description": "Sign the word 'Bath' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/hygiene/bath/bath_01.mp4"
        },
        {
                "id": "lesson_275", "categoryId": "hygiene", "title": "Brush", "englishTitle": "Brush", "tagalogTitle": "Pagsisipilyo",
                "description": "Sign the word 'Brush' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/hygiene/brush/brush_01.mp4"
        },
        {
                "id": "lesson_276", "categoryId": "hygiene", "title": "Clean", "englishTitle": "Clean", "tagalogTitle": "Malinis",
                "description": "Sign the word 'Clean' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/hygiene/clean/clean_01.mp4"
        },
        {
                "id": "lesson_277", "categoryId": "hygiene", "title": "Shampoo", "englishTitle": "Shampoo", "tagalogTitle": "Siyampu",
                "description": "Sign the word 'Shampoo' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/hygiene/shampoo/shampoo_01.mp4"
        },
        {
                "id": "lesson_278", "categoryId": "hygiene", "title": "Soap", "englishTitle": "Soap", "tagalogTitle": "Sabon",
                "description": "Sign the word 'Soap' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/hygiene/soap/soap_01.mp4"
        },
        {
                "id": "lesson_279", "categoryId": "hygiene", "title": "Toothbrush", "englishTitle": "Toothbrush", "tagalogTitle": "Sipilyo",
                "description": "Sign the word 'Toothbrush' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/hygiene/toothbrush/toothbrush_01.mp4"
        },
        {
                "id": "lesson_280", "categoryId": "hygiene", "title": "Toothpaste", "englishTitle": "Toothpaste", "tagalogTitle": "Toothpaste",
                "description": "Sign the word 'Toothpaste' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/hygiene/toothpaste/toothpaste_01.mp4"
        },
        {
                "id": "lesson_281", "categoryId": "hygiene", "title": "Towel", "englishTitle": "Towel", "tagalogTitle": "Tuwalya",
                "description": "Sign the word 'Towel' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/hygiene/towel/towel_01.mp4"
        },
        {
                "id": "lesson_282", "categoryId": "hygiene", "title": "Wash", "englishTitle": "Wash", "tagalogTitle": "Maghugas",
                "description": "Sign the word 'Wash' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/hygiene/wash/wash_01.mp4"
        },
        {
                "id": "lesson_283", "categoryId": "hygiene", "title": "Water", "englishTitle": "Water", "tagalogTitle": "Tubig",
                "description": "Sign the word 'Water' in Filipino Sign Language (FSL).",
                "steps": ["Raise your dominant hand to initiate the sign.", "Mirror the hand movement and facial expression shown in the video.", "Face your palm outward toward the viewer with a clear gesture."],
                "animation": "/additional-sl/hygiene/water/water_01.mp4"
        },
];

    // Add or update the bundled curriculum without clearing existing IndexedDB
    // content. `put` is idempotent, so re-seeding keeps saved data intact.
    // Bulk insert categories
    for (const cat of categories) {
        try {
            await saveCategory(cat);
        } catch (e) {
            console.error("Error seeding category:", cat.id, e);
        }
    }

    // Bulk insert lessons
    for (const les of lessons) {
        try {
            await saveLesson(les);
        } catch (e) {
            console.error("Error seeding lesson:", les.id, e);
        }
    }

    console.log("IndexedDB database seeding complete.");
}
