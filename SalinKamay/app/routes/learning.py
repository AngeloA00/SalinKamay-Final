from fastapi import APIRouter, HTTPException

router = APIRouter()

# FSL Sign Database for text-to-sign lookups
SIGN_DICTIONARY = {
    "hello": {
        "title": "Hello / Kamusta",
        "description": "Basic greeting in Filipino Sign Language",
        "steps": [
            "Raise your hand to about shoulder level",
            "Ensure your open palm is facing outward towards the person",
            "Move your hand slightly forward in a waving motion"
        ],
        "animation": "hello.mp4"
    },
    "kamusta": {
        "title": "Hello / Kamusta",
        "description": "Basic greeting in Filipino Sign Language",
        "steps": [
            "Raise your hand to about shoulder level",
            "Ensure your open palm is facing outward towards the person",
            "Move your hand slightly forward in a waving motion"
        ],
        "animation": "hello.mp4"
    },
    "thank you": {
        "title": "Salamat",
        "description": "Express gratitude in FSL",
        "steps": [
            "Start with your dominant hand flat, fingers pointing up and together",
            "Touch the tips of your fingers to your lips or chin",
            "Move your hand down and forward towards the person with a polite nod"
        ],
        "animation": "thankyou.mp4"
    },
    "salamat": {
        "title": "Salamat",
        "description": "Express gratitude in FSL",
        "steps": [
            "Start with your dominant hand flat, fingers pointing up and together",
            "Touch the tips of your fingers to your lips or chin",
            "Move your hand down and forward towards the person with a polite nod"
        ],
        "animation": "thankyou.mp4"
    },
    "help": {
        "title": "Tulungan mo ako",
        "description": "Request assistance in FSL",
        "steps": [
            "Place your non-dominant hand flat, palm facing up",
            "Make a fist with your dominant hand, thumb pointing up",
            "Place the dominant hand fist on top of your non-dominant hand palm",
            "Lift both hands together upward in front of your chest"
        ],
        "animation": "help.mp4"
    },
    "tulungan mo ako": {
        "title": "Tulungan mo ako",
        "description": "Request assistance in FSL",
        "steps": [
            "Hold your hand in front of your chest",
            "Move the hand straight upward along the Y-axis",
            "Keep the motion direct and steady"
        ],
        "animation": "help.mp4"
    },
    "sorry": {
        "title": "Pasensya na",
        "description": "Apologize in FSL",
        "steps": [
            "Form a fist with your dominant hand, thumb crossing over your fingers (representing letter 'S')",
            "Place the fist on your chest",
            "Move it in a circular motion counter-clockwise over your chest a few times"
        ],
        "animation": "sorry.mp4"
    },
    "pasensya na": {
        "title": "Pasensya na",
        "description": "Apologize in FSL",
        "steps": [
            "Form a fist with your dominant hand",
            "Place the fist over your chest",
            "Rub in a circular motion across the X/Y axes"
        ],
        "animation": "sorry.mp4"
    },
    "mahal kita": {
        "title": "Mahal Kita",
        "description": "Say I love you in FSL",
        "steps": [
            "Form the ILY handshape with thumb, index finger, and pinky extended",
            "Hold the hand facing the person",
            "Move the ILY handshape forward and backward along the Z-axis"
        ],
        "animation": "mahal_kita.mp4"
    },
    "kumusta ka": {
        "title": "Kumusta ka",
        "description": "Ask how someone is in FSL",
        "steps": [
            "Use a flat open hand",
            "Start near the body",
            "Move the hand outward across the X/Z axes"
        ],
        "animation": "kumusta_ka.mp4"
    },
    "paalam na": {
        "title": "Paalam na",
        "description": "Say goodbye in FSL",
        "steps": [
            "Use a flat open hand",
            "Raise the hand where it is clearly visible",
            "Wave quickly left and right along the X-axis"
        ],
        "animation": "paalam_na.mp4"
    },
    "good morning": {
        "title": "Magandang Umaga",
        "description": "Greet someone in the morning in FSL",
        "steps": [
            "Touch your chin with your flat dominant hand and bring it forward (sign for 'Good')",
            "Place your non-dominant hand flat at the elbow fold of your dominant arm",
            "Raise your dominant hand upward like the rising sun (sign for 'Morning')"
        ],
        "animation": "good_morning.mp4"
    },
    "magandang umaga": {
        "title": "Magandang Umaga",
        "description": "Greet someone in the morning in FSL",
        "steps": [
            "Touch your chin with your flat dominant hand and bring it forward (sign for 'Good')",
            "Place your non-dominant hand flat at the elbow fold of your dominant arm",
            "Raise your dominant hand upward like the rising sun (sign for 'Morning')"
        ],
        "animation": "good_morning.mp4"
    },
    # Custom FSL - Animals
    "aso": {
        "title": "Aso (Dog)",
        "description": "Sign for dog in Filipino Sign Language",
        "steps": ["Snap fingers and pat your thigh or mime dog ears near head", "Keep motion natural"],
        "animation": "/custom_fsl/Animals/Dog/dog_01.mp4"
    },
    "dog": {
        "title": "Aso (Dog)",
        "description": "Sign for dog in Filipino Sign Language",
        "steps": ["Snap fingers and pat your thigh or mime dog ears near head", "Keep motion natural"],
        "animation": "/custom_fsl/Animals/Dog/dog_01.mp4"
    },
    "pusa": {
        "title": "Pusa (Cat)",
        "description": "Sign for cat in Filipino Sign Language",
        "steps": ["Use open fingers at cheek to mime pulling cat whiskers outward", "Move gently outward"],
        "animation": "/custom_fsl/Animals/Cat/cat_01.mp4"
    },
    "cat": {
        "title": "Pusa (Cat)",
        "description": "Sign for cat in Filipino Sign Language",
        "steps": ["Use open fingers at cheek to mime pulling cat whiskers outward", "Move gently outward"],
        "animation": "/custom_fsl/Animals/Cat/cat_01.mp4"
    },
    "ibon": {
        "title": "Ibon (Bird)",
        "description": "Sign for bird in Filipino Sign Language",
        "steps": ["Place thumb and index finger at mouth to mime a bird beak opening and closing", "Tap fingers together"],
        "animation": "/custom_fsl/Animals/Bird/bird_01.mp4"
    },
    "bird": {
        "title": "Ibon (Bird)",
        "description": "Sign for bird in Filipino Sign Language",
        "steps": ["Place thumb and index finger at mouth to mime a bird beak opening and closing", "Tap fingers together"],
        "animation": "/custom_fsl/Animals/Bird/bird_01.mp4"
    },
    "kabayo": {
        "title": "Kabayo (Horse)",
        "description": "Sign for horse in Filipino Sign Language",
        "steps": ["Place thumb on temple with index and middle finger extended upward, bending forward like ears", "Bend fingers twice"],
        "animation": "/custom_fsl/Animals/Horse/horse_01.mp4"
    },
    "horse": {
        "title": "Kabayo (Horse)",
        "description": "Sign for horse in Filipino Sign Language",
        "steps": ["Place thumb on temple with index and middle finger extended upward, bending forward like ears", "Bend fingers twice"],
        "animation": "/custom_fsl/Animals/Horse/horse_01.mp4"
    },
    "baboy": {
        "title": "Baboy (Pig)",
        "description": "Sign for pig in Filipino Sign Language",
        "steps": ["Place back of dominant hand under chin and flap fingers downward repeatedly", "Maintain steady cadence"],
        "animation": "/custom_fsl/Animals/Pig/pig_01.mp4"
    },
    "pig": {
        "title": "Baboy (Pig)",
        "description": "Sign for pig in Filipino Sign Language",
        "steps": ["Place back of dominant hand under chin and flap fingers downward repeatedly", "Maintain steady cadence"],
        "animation": "/custom_fsl/Animals/Pig/pig_01.mp4"
    },

    # Custom FSL - Body Parts
    "mata": {
        "title": "Mata (Eyes)",
        "description": "Sign for eyes in FSL",
        "steps": ["Point with index finger toward eye gently", "Do not touch eye directly"],
        "animation": "/custom_fsl/Body Parts/Eyes/Eyes_01.mp4"
    },
    "eyes": {
        "title": "Mata (Eyes)",
        "description": "Sign for eyes in FSL",
        "steps": ["Point with index finger toward eye gently", "Do not touch eye directly"],
        "animation": "/custom_fsl/Body Parts/Eyes/Eyes_01.mp4"
    },
    "ilong": {
        "title": "Ilong (Nose)",
        "description": "Sign for nose in FSL",
        "steps": ["Tap or point gently to the tip of your nose with index finger", "Hold briefly"],
        "animation": "/custom_fsl/Body Parts/Nose/Nose_01.mp4"
    },
    "nose": {
        "title": "Ilong (Nose)",
        "description": "Sign for nose in FSL",
        "steps": ["Tap or point gently to the tip of your nose with index finger", "Hold briefly"],
        "animation": "/custom_fsl/Body Parts/Nose/Nose_01.mp4"
    },
    "tainga": {
        "title": "Tainga (Ears)",
        "description": "Sign for ears in FSL",
        "steps": ["Touch or point to your earlobe with index finger or thumb and index", "Hold clearly"],
        "animation": "/custom_fsl/Body Parts/Ears/Ears_01.mp4"
    },
    "ears": {
        "title": "Tainga (Ears)",
        "description": "Sign for ears in FSL",
        "steps": ["Touch or point to your earlobe with index finger or thumb and index", "Hold clearly"],
        "animation": "/custom_fsl/Body Parts/Ears/Ears_01.mp4"
    },
    "bibig": {
        "title": "Bibig (Mouth)",
        "description": "Sign for mouth in FSL",
        "steps": ["Outline lips or point directly toward mouth with index finger", "Motion clearly"],
        "animation": "/custom_fsl/Body Parts/Mouth/Mouth_01.mp4"
    },
    "mouth": {
        "title": "Bibig (Mouth)",
        "description": "Sign for mouth in FSL",
        "steps": ["Outline lips or point directly toward mouth with index finger", "Motion clearly"],
        "animation": "/custom_fsl/Body Parts/Mouth/Mouth_01.mp4"
    },
    "kamay": {
        "title": "Kamay (Hand)",
        "description": "Sign for hand in FSL",
        "steps": ["Hold one open hand forward and brush other hand gently across back of hand", "Keep hand steady"],
        "animation": "/custom_fsl/Body Parts/Hand/Hand_01.mp4"
    },
    "hand": {
        "title": "Kamay (Hand)",
        "description": "Sign for hand in FSL",
        "steps": ["Hold one open hand forward and brush other hand gently across back of hand", "Keep hand steady"],
        "animation": "/custom_fsl/Body Parts/Hand/Hand_01.mp4"
    },
    "buhok": {
        "title": "Buhok (Hair)",
        "description": "Sign for hair in FSL",
        "steps": ["Grasp small strand of hair between thumb and index finger gently", "Hold briefly"],
        "animation": "/custom_fsl/Body Parts/Hair/Hair_01.mp4"
    },
    "hair": {
        "title": "Buhok (Hair)",
        "description": "Sign for hair in FSL",
        "steps": ["Grasp small strand of hair between thumb and index finger gently", "Hold briefly"],
        "animation": "/custom_fsl/Body Parts/Hair/Hair_01.mp4"
    },
    "ngipin": {
        "title": "Ngipin (Teeth)",
        "description": "Sign for teeth in FSL",
        "steps": ["Point index finger across front teeth with a gentle side-to-side motion", "Smile clearly"],
        "animation": "/custom_fsl/Body Parts/Teeth/Teeth_01.mp4"
    },
    "teeth": {
        "title": "Ngipin (Teeth)",
        "description": "Sign for teeth in FSL",
        "steps": ["Point index finger across front teeth with a gentle side-to-side motion", "Smile clearly"],
        "animation": "/custom_fsl/Body Parts/Teeth/Teeth_01.mp4"
    },

    # Custom FSL - Emotion
    "masaya": {
        "title": "Masaya (Happy)",
        "description": "Sign for happy in FSL",
        "steps": ["Brush open flat hand upward across chest repeatedly with joyful expression", "Smile naturally"],
        "animation": "/custom_fsl/Emotion/Happy/happy_01.mp4"
    },
    "happy": {
        "title": "Masaya (Happy)",
        "description": "Sign for happy in FSL",
        "steps": ["Brush open flat hand upward across chest repeatedly with joyful expression", "Smile naturally"],
        "animation": "/custom_fsl/Emotion/Happy/happy_01.mp4"
    },
    "malungkot": {
        "title": "Malungkot (Sad)",
        "description": "Sign for sad in FSL",
        "steps": ["Hold open hand before face and draw it downward while tilting head down", "Show solemn expression"],
        "animation": "/custom_fsl/Emotion/Sad/sad_01.mp4"
    },
    "sad": {
        "title": "Malungkot (Sad)",
        "description": "Sign for sad in FSL",
        "steps": ["Hold open hand before face and draw it downward while tilting head down", "Show solemn expression"],
        "animation": "/custom_fsl/Emotion/Sad/sad_01.mp4"
    },
    "galit": {
        "title": "Galit (Angry)",
        "description": "Sign for angry in FSL",
        "steps": ["Claw fingers in front of face and pull outward with fierce expression", "Maintain strong motion"],
        "animation": "/custom_fsl/Emotion/Angry/angry_01.mp4"
    },
    "angry": {
        "title": "Galit (Angry)",
        "description": "Sign for angry in FSL",
        "steps": ["Claw fingers in front of face and pull outward with fierce expression", "Maintain strong motion"],
        "animation": "/custom_fsl/Emotion/Angry/angry_01.mp4"
    },
    "takot": {
        "title": "Takot (Scared)",
        "description": "Sign for scared in FSL",
        "steps": ["Bring both open hands toward center of chest in quick trembling protective motion", "Show startled expression"],
        "animation": "/custom_fsl/Emotion/Scared/scared_01.mp4"
    },
    "scared": {
        "title": "Takot (Scared)",
        "description": "Sign for scared in FSL",
        "steps": ["Bring both open hands toward center of chest in quick trembling protective motion", "Show startled expression"],
        "animation": "/custom_fsl/Emotion/Scared/scared_01.mp4"
    },
    "mahiyain": {
        "title": "Mahiyain (Shy)",
        "description": "Sign for shy in FSL",
        "steps": ["Turn back of fingers against cheek and turn head slightly away", "Lower gaze politely"],
        "animation": "/custom_fsl/Emotion/Shy/shy_01.mp4"
    },
    "shy": {
        "title": "Mahiyain (Shy)",
        "description": "Sign for shy in FSL",
        "steps": ["Turn back of fingers against cheek and turn head slightly away", "Lower gaze politely"],
        "animation": "/custom_fsl/Emotion/Shy/shy_01.mp4"
    },

    # Custom FSL - Fruits & Vegetables
    "saging": {
        "title": "Saging (Banana)",
        "description": "Sign for banana in FSL",
        "steps": ["Hold non-dominant index finger upright and mime peeling skin downward with dominant hand", "Peel on two sides"],
        "animation": "/custom_fsl/Fruits/Banana/banana_01.mp4"
    },
    "banana": {
        "title": "Saging (Banana)",
        "description": "Sign for banana in FSL",
        "steps": ["Hold non-dominant index finger upright and mime peeling skin downward with dominant hand", "Peel on two sides"],
        "animation": "/custom_fsl/Fruits/Banana/banana_01.mp4"
    },
    "mangga": {
        "title": "Mangga (Mango)",
        "description": "Sign for mango in FSL",
        "steps": ["Cup hand near mouth as if holding half a ripe mango and slicing/eating", "Move hand smoothly"],
        "animation": "/custom_fsl/Fruits/Mango/mango_01.mp4"
    },
    "mango": {
        "title": "Mangga (Mango)",
        "description": "Sign for mango in FSL",
        "steps": ["Cup hand near mouth as if holding half a ripe mango and slicing/eating", "Move hand smoothly"],
        "animation": "/custom_fsl/Fruits/Mango/mango_01.mp4"
    },
    "kamatis": {
        "title": "Kamatis (Tomato)",
        "description": "Sign for tomato in FSL",
        "steps": ["Touch lip with index finger (sign for red) then mime slicing a round shape onto non-dominant hand", "Slice cleanly"],
        "animation": "/custom_fsl/Vegetables/Tomato/tomato_01.mp4"
    },
    "tomato": {
        "title": "Kamatis (Tomato)",
        "description": "Sign for tomato in FSL",
        "steps": ["Touch lip with index finger (sign for red) then mime slicing a round shape onto non-dominant hand", "Slice cleanly"],
        "animation": "/custom_fsl/Vegetables/Tomato/tomato_01.mp4"
    },
    "sibuyas": {
        "title": "Sibuyas (Onions)",
        "description": "Sign for onions in FSL",
        "steps": ["Twist knuckles or index finger near cheek/eye corner as if shedding a tear", "Twist gently"],
        "animation": "/custom_fsl/Vegetables/Onions/onion_01.mp4"
    },
    "onions": {
        "title": "Sibuyas (Onions)",
        "description": "Sign for onions in FSL",
        "steps": ["Twist knuckles or index finger near cheek/eye corner as if shedding a tear", "Twist gently"],
        "animation": "/custom_fsl/Vegetables/Onions/onion_01.mp4"
    },

    # Custom FSL - Profession
    "guro": {
        "title": "Guro (Teacher)",
        "description": "Sign for teacher in FSL",
        "steps": ["Bring both flattened O-hands forward from temples (sign for teach), then drop flat hands down (person suffix)", "Execute smoothly"],
        "animation": "/custom_fsl/Profession/Teacher/Teacher_01.mp4"
    },
    "teacher": {
        "title": "Guro (Teacher)",
        "description": "Sign for teacher in FSL",
        "steps": ["Bring both flattened O-hands forward from temples (sign for teach), then drop flat hands down (person suffix)", "Execute smoothly"],
        "animation": "/custom_fsl/Profession/Teacher/Teacher_01.mp4"
    },
    "doktor": {
        "title": "Doktor (Doctor)",
        "description": "Sign for doctor in FSL",
        "steps": ["Tap bent fingers of dominant hand on inside wrist of non-dominant hand like checking a pulse", "Tap twice"],
        "animation": "/custom_fsl/Profession/Doctor/Doctor_01.mp4"
    },
    "doctor": {
        "title": "Doktor (Doctor)",
        "description": "Sign for doctor in FSL",
        "steps": ["Tap bent fingers of dominant hand on inside wrist of non-dominant hand like checking a pulse", "Tap twice"],
        "animation": "/custom_fsl/Profession/Doctor/Doctor_01.mp4"
    },
    "pulis": {
        "title": "Pulis (Police)",
        "description": "Sign for police in FSL",
        "steps": ["Form a 'C' handshape and place on opposite upper chest representing a police badge", "Hold firmly"],
        "animation": "/custom_fsl/Profession/Police/Police_01.mp4"
    },
    "police": {
        "title": "Pulis (Police)",
        "description": "Sign for police in FSL",
        "steps": ["Form a 'C' handshape and place on opposite upper chest representing a police badge", "Hold firmly"],
        "animation": "/custom_fsl/Profession/Police/Police_01.mp4"
    },

    # Transactional FSL
    "cash": {
        "title": "Pera / Cash",
        "description": "Sign for cash payment in FSL",
        "steps": ["Slap flat back of dominant fingers onto palm of non-dominant hand repeatedly", "Maintain clear money gesture"],
        "animation": "cash.mp4"
    },
    "pera": {
        "title": "Pera / Cash",
        "description": "Sign for cash payment in FSL",
        "steps": ["Slap flat back of dominant fingers onto palm of non-dominant hand repeatedly", "Maintain clear money gesture"],
        "animation": "cash.mp4"
    },
    "card": {
        "title": "Kard (Payment Card)",
        "description": "Sign for credit/debit card in FSL",
        "steps": ["Hold rectangular imaginary card between thumb and index, mime swiping through card reader", "Swipe smoothly forward"],
        "animation": "card.mp4"
    },
    "kard": {
        "title": "Kard (Payment Card)",
        "description": "Sign for credit/debit card in FSL",
        "steps": ["Hold rectangular imaginary card between thumb and index, mime swiping through card reader", "Swipe smoothly forward"],
        "animation": "card.mp4"
    },
    "coin": {
        "title": "Barya (Coin)",
        "description": "Sign for coins in FSL",
        "steps": ["Form a small circle with thumb and index finger against palm of non-dominant hand", "Tap twice"],
        "animation": "coin.mp4"
    },
    "barya": {
        "title": "Barya (Coin)",
        "description": "Sign for coins in FSL",
        "steps": ["Form a small circle with thumb and index finger against palm of non-dominant hand", "Tap twice"],
        "animation": "coin.mp4"
    },
    "receipt": {
        "title": "Resibo (Receipt)",
        "description": "Sign for receipt in FSL",
        "steps": ["Hold flat non-dominant palm, mime tearing or stamping a paper slip onto it", "Pull hand away cleanly"],
        "animation": "receipt.mp4"
    },
    "resibo": {
        "title": "Resibo (Receipt)",
        "description": "Sign for receipt in FSL",
        "steps": ["Hold flat non-dominant palm, mime tearing or stamping a paper slip onto it", "Pull hand away cleanly"],
        "animation": "receipt.mp4"
    },
    "discount": {
        "title": "Diskwento (Discount)",
        "description": "Sign for discount/reduction in FSL",
        "steps": ["Open flat hand moves downward in stair-step or slicing motion indicating lowered price", "Move downward"],
        "animation": "discount.mp4"
    },
    "diskwento": {
        "title": "Diskwento (Discount)",
        "description": "Sign for discount/reduction in FSL",
        "steps": ["Open flat hand moves downward in stair-step or slicing motion indicating lowered price", "Move downward"],
        "animation": "discount.mp4"
    },
    "magkano": {
        "title": "Magkano (How Much)",
        "description": "Ask how much an item costs in FSL",
        "steps": ["Rub thumb across tips of index and middle finger in money-counting gesture while tilting head", "Inquisitive expression"],
        "animation": "how_much.mp4"
    },
    "how much": {
        "title": "Magkano (How Much)",
        "description": "Ask how much an item costs in FSL",
        "steps": ["Rub thumb across tips of index and middle finger in money-counting gesture while tilting head", "Inquisitive expression"],
        "animation": "how_much.mp4"
    },
    "ilan": {
        "title": "Ilan (How Many)",
        "description": "Ask how many items in FSL",
        "steps": ["Hold both open palms up and flutter fingers upward while furrowing brow", "Inquisitive expression"],
        "animation": "how_many.mp4"
    },
    "how many": {
        "title": "Ilan (How Many)",
        "description": "Ask how many items in FSL",
        "steps": ["Hold both open palms up and flutter fingers upward while furrowing brow", "Inquisitive expression"],
        "animation": "how_many.mp4"
    },
    "sandali": {
        "title": "Sandali (Wait)",
        "description": "Sign to wait a moment in FSL",
        "steps": ["Hold one hand up with palm forward and wiggle fingers slightly", "Calm gesture"],
        "animation": "wait.mp4"
    },
    "wait": {
        "title": "Sandali (Wait)",
        "description": "Sign to wait a moment in FSL",
        "steps": ["Hold one hand up with palm forward and wiggle fingers slightly", "Calm gesture"],
        "animation": "wait.mp4"
    },
    "problema": {
        "title": "Problema (Problem)",
        "description": "Sign indicating an issue or problem in FSL",
        "steps": ["Knuckles of bent index and middle fingers twist against each other", "Troubled facial expression"],
        "animation": "problem.mp4"
    },
    "problem": {
        "title": "Problema (Problem)",
        "description": "Sign indicating an issue or problem in FSL",
        "steps": ["Knuckles of bent index and middle fingers twist against each other", "Troubled facial expression"],
        "animation": "problem.mp4"
    }
}

@router.get("/text-to-sign")
def text_to_sign(text: str):
    normalized = text.strip().lower()
    
    if normalized in SIGN_DICTIONARY:
        return {
            "status": "success",
            "match": True,
            "data": SIGN_DICTIONARY[normalized]
        }
        
    # Fallback to spelling letters of the word if it's a single character
    if len(normalized) == 1 and normalized.isalpha():
        letter = normalized.upper()
        return {
            "status": "success",
            "match": True,
            "data": {
                "title": letter,
                "description": f"The letter '{letter}' in Filipino Sign Language fingerspelling",
                "steps": [
                    f"Form the shape of the letter '{letter}' with your dominant hand",
                    "Keep your arm relaxed and hold the hand shape static facing the viewer"
                ],
                "animation": f"{normalized}.mp4"
            }
        }
        
    return {
        "status": "success",
        "match": False,
        "message": "FSL gesture not found. Try 'salamat', 'pasensya na', 'mahal kita', 'tulungan mo ako', 'kumusta ka', 'paalam na', or single letters."
    }
