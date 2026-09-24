import os
import json

# The learning and text-to-sign sections do not require the AI model.  Keep
# the web app available when the optional model runtime has not been installed
# yet (for example, while TensorFlow is being installed on Windows).
try:
    import numpy as np
except ImportError:
    np = None

try:
    import tensorflow as tf
except ImportError:
    tf = None

if np is not None:
    from app.ai.preprocessing import normalize_landmarks
else:
    normalize_landmarks = None

# Load model configuration paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) # points to 'app'
ALPHABET_MODEL_PATH = os.path.join(BASE_DIR, "models", "alphabet.keras")
FSL105_MODEL_PATH = os.path.join(BASE_DIR, "models", "fsl105.keras")
FSL105_CLASSES_PATH = os.path.join(BASE_DIR, "..", "dataset", "metadata", "fsl105_classes.json")

# Gesture class mappings
ALPHABET_CLASSES = [chr(65 + i) for i in range(26)] # A-Z

# Mapping raw FSL-105 dataset class labels to Filipino words/phrases
def normalize_translation_label(label):
    """Normalize dataset labels before looking them up in the Filipino map."""
    return " ".join(
        label.replace("’", "'").replace("‘", "'").split()
    ).upper()


FSL_FILIPINO_MAP = {
    # Greetings
    "GOOD MORNING": "Magandang Umaga",
    "GOOD AFTERNOON": "Magandang Hapon",
    "GOOD EVENING": "Magandang Gabi",
    "HELLO": "Hello / Kamusta",
    "HOW ARE YOU": "Kamusta Ka",
    "IM FINE": "Mabuti Naman",
    "I'M FINE": "Mabuti Naman",
    "NICE TO MEET YOU": "Kinagagalak Kong Makilala Ka",
    "THANK YOU": "Salamat",
    "YOURE WELCOME": "Walang Anuman",
    "YOU'RE WELCOME": "Walang Anuman",
    "SEE YOU TOMORROW": "Magkita Tayo Bukas",
    
    # Survival
    "UNDERSTAND": "Naintindihan",
    "DON’T UNDERSTAND": "Hindi Naintindihan",
    "DON'T UNDERSTAND": "Hindi Naintindihan",
    "KNOW": "Alam",
    "DON’T KNOW": "Hindi Alam",
    "DON'T KNOW": "Hindi Alam",
    "NO": "Hindi",
    "YES": "Oo",
    "WRONG": "Mali",
    "CORRECT": "Tama",
    "SLOW": "Mabagal",
    "FAST": "Mabilis",
    
    # Numbers
    "ONE": "Isa",
    "TWO": "Dalawa",
    "THREE": "Tatlo",
    "FOUR": "Apat",
    "FIVE": "Lima",
    "SIX": "Anim",
    "SEVEN": "Pito",
    "EIGHT": "Walo",
    "NINE": "Siyam",
    "NINE ": "Siyam",
    "TEN": "Sampu",
    
    # Calendar
    "JANUARY": "Enero",
    "FEBRUARY": "Pebrero",
    "MARCH": "Marso",
    "APRIL": "Abril",
    "MAY": "Mayo",
    "JUNE": "Hunyo",
    "JULY": "Hulyo",
    "AUGUST": "Agosto",
    "SEPTEMBER": "Setyembre",
    "OCTOBER": "Oktubre",
    "NOVEMBER": "Nobyembre",
    "DECEMBER": "Disyembre",
    
    # Days
    "MONDAY": "Lunes",
    "TUESDAY": "Martes",
    "WEDNESDAY": "Miyerkules",
    "THURSDAY": "Huwebes",
    "FRIDAY": "Biyernes",
    "SATURDAY": "Sabado",
    "SUNDAY": "Linggo",
    "TODAY": "Ngayon",
    "TOMORROW": "Bukas",
    "YESTERDAY": "Kahapon",
    
    # Family
    "FATHER": "Tatay / Ama",
    "MOTHER": "Nanay / Ina",
    "SON": "Anak na Lalaki",
    "DAUGHTER": "Anak na Babae",
    "GRANDFATHER": "Lolo",
    "GRANDMOTHER": "Lola",
    "UNCLE": "Tito",
    "AUNTIE": "Tita",
    "COUSIN": "Pinsan",
    "PARENTS": "Mga Magulang",
    
    # Relationships
    "BOY": "Batang Lalaki",
    "GIRL": "Batang Babae",
    "MAN": "Lalaki",
    "WOMAN": "Babae",
    "DEAF": "Bingi",
    "HARD OF HEARING": "Mahina ang Pandinig",
    "WEELCHAIR PERSON": "Gumagamit ng Wheelchair",
    "BLIND": "Bulag",
    "DEAF BLIND": "Bingi at Bulag",
    "MARRIED": "Kasal",
    
    # Colors
    "BLUE": "Asul",
    "GREEN": "Berde",
    "RED": "Pula",
    "BROWN": "Kayumanggi",
    "BLACK": "Itim",
    "WHITE": "Puti",
    "YELLOW": "Dilaw",
    "ORANGE": "Kahel",
    "GRAY": "Abo",
    "PINK": "Rosas",
    "VIOLET": "Lila",
    "LIGHT": "Maliwanag",
    "DARK": "Madilim",
    
    # Food
    "BREAD": "Tinapay",
    "EGG": "Itlog",
    "FISH": "Isda",
    "MEAT": "Karne",
    "CHICKEN": "Manok",
    "SPAGHETTI": "Spaghetti",
    "RICE": "Kanin",
    "LONGANISA": "Longganisa",
    "SHRIMP": "Hipon",
    "CRAB": "Alimango",
    
    # Drinks
    "HOT": "Mainit",
    "COLD": "Malamig",
    "JUICE": "Juice",
    "MILK": "Gatas",
    "COFFEE": "Kape",
    "TEA": "Tsaa",
    "BEER": "Beer",
    "WINE": "Alak",
    "SUGAR": "Asukal",
    "NO SUGAR": "Walang Asukal",

    # Custom FSL - Animals
    "BIRD": "Ibon (Bird)",
    "CAT": "Pusa (Cat)",
    "DOG": "Aso (Dog)",
    "HORSE": "Kabayo (Horse)",
    "PIG": "Baboy (Pig)",

    # Custom FSL - Body Parts
    "EARS": "Tainga (Ears)",
    "EYES": "Mata (Eyes)",
    "HAIR": "Buhok (Hair)",
    "HAND": "Kamay (Hand)",
    "MOUTH": "Bibig (Mouth)",
    "NOSE": "Ilong (Nose)",
    "TEETH": "Ngipin (Teeth)",

    # Custom FSL - Emotion
    "ANGRY": "Galit (Angry)",
    "HAPPY": "Masaya (Happy)",
    "SAD": "Malungkot (Sad)",
    "SCARED": "Takot (Scared)",
    "SHY": "Mahiyain (Shy)",

    # Custom FSL - Fruits
    "BANANA": "Saging (Banana)",
    "COCONUT": "Niyog (Coconut)",
    "MANGO": "Mangga (Mango)",
    "PINEAPPLE": "Pinya (Pineapple)",
    "WATERMELON": "Pakwan (Watermelon)",

    # Custom FSL - Profession
    "CHEF": "Kusinero (Chef)",
    "DOCTOR": "Doktor (Doctor)",
    "ENGINEER": "Inhinyero (Engineer)",
    "FIREFIGHTER": "Bumbero (Firefighter)",
    "NURSE": "Nars (Nurse)",
    "PLUMBER": "Tubero (Plumber)",
    "POLICE": "Pulis (Police)",
    "PRINCIPAL": "Punong-Guro (Principal)",
    "PROGRAMMER": "Programmer",
    "TEACHER": "Guro (Teacher)",

    # Custom FSL - Vegetables
    "CORN": "Mais (Corn)",
    "CUCUMBER": "Pipino (Cucumber)",
    "ONIONS": "Sibuyas (Onions)",
    "POTATO": "Patatas (Potato)",
    "TOMATO": "Kamatis (Tomato)",

    # Transactional FSL
    "AGAIN": "Ulitin / Muli",
    "CARD": "Kard (Card)",
    "CASH": "Pera / Cash",
    "COIN": "Barya (Coin)",
    "DISCOUNT": "Diskwento (Discount)",
    "HOW_MANY": "Ilan (How Many)",
    "HOW_MUCH": "Magkano (How Much)",
    "PLEASE": "Pakiusap (Please)",
    "PROBLEM": "Problema (Problem)",
    "RECEIPT": "Resibo (Receipt)",
    "WAIT": "Sandali / Hintay (Wait)",
    "WELCOME": "Walang Anuman / Tuloy Kayo"
}

FSL_FILIPINO_MAP_NORMALIZED = {
    normalize_translation_label(label): translation
    for label, translation in FSL_FILIPINO_MAP.items()
}

def add_phrase_motion_features(sequence):
    """Add per-frame wrist velocity and wrist offset features for the 105-class sequence model."""
    seq = np.array(sequence, dtype=np.float32).reshape(30, 63)
    wrist = seq[:, 0:3]
    offsets = wrist - wrist[:1, :]
    velocity = np.diff(wrist, axis=0, prepend=wrist[:1, :])
    return np.concatenate([seq, offsets, velocity], axis=1)

class FSLPredictor:
    def __init__(self, confidence_threshold=0.35):
        self.confidence_threshold = confidence_threshold
        self.alphabet_model = None
        self.phrase_model = None
        self.phrase_classes = []
        self.load_models()

    def load_models(self):
        """Loads both Keras models if available."""
        if np is None or tf is None:
            missing = []
            if np is None:
                missing.append("NumPy")
            if tf is None:
                missing.append("TensorFlow")
            print(
                "AI prediction is unavailable because "
                + " and ".join(missing)
                + " is not installed. The rest of SalinKamay can still run."
            )
            return

        if os.path.exists(ALPHABET_MODEL_PATH):
            try:
                self.alphabet_model = tf.keras.models.load_model(ALPHABET_MODEL_PATH)
                print(f"Alphabet model loaded successfully from {ALPHABET_MODEL_PATH}")
            except Exception as e:
                print(f"Error loading alphabet model: {e}")
        else:
            print(f"Alphabet model not found at {ALPHABET_MODEL_PATH}")

        # Load the new 105-class Deep Learning Model
        if os.path.exists(FSL105_MODEL_PATH):
            try:
                self.phrase_model = tf.keras.models.load_model(FSL105_MODEL_PATH)
                print(f"FSL-105 model loaded successfully from {FSL105_MODEL_PATH}")
                
                # Load the JSON classes mapping
                if os.path.exists(FSL105_CLASSES_PATH):
                    with open(FSL105_CLASSES_PATH, "r", encoding="utf-8") as f:
                        self.phrase_classes = json.load(f)
                else:
                    print(f"Warning: FSL-105 classes JSON not found at {FSL105_CLASSES_PATH}")
            except Exception as e:
                print(f"Error loading FSL-105 model: {e}")
        else:
            print(f"FSL-105 model not found at {FSL105_MODEL_PATH}")

        # Build TensorFlow execution graphs before the first camera request.
        try:
            if self.alphabet_model is not None:
                self.alphabet_model.predict(np.zeros((1, 63), dtype=np.float32), verbose=0)
            if self.phrase_model is not None:
                self.phrase_model.predict(np.zeros((1, 30, 69), dtype=np.float32), verbose=0)
            print("Prediction models warmed up and ready.")
        except Exception as e:
            print(f"Model warm-up skipped: {e}")

    def predict_alphabet(self, landmarks_list):
        """
        Predict FSL Alphabet character from a single frame list of 63 coordinates.
        """
        if self.alphabet_model is None:
            return "Model not initialized", 0.0

        try:
            # 1. Normalize coordinates
            normalized = normalize_landmarks(landmarks_list)
            
            # 2. Reshape to model input shape (1, 63)
            input_data = np.expand_dims(normalized, axis=0)
            
            # 3. Predict
            predictions = self.alphabet_model.predict(input_data, verbose=0)[0]
            max_idx = np.argmax(predictions)
            confidence = float(predictions[max_idx])
            
            # 4. Confidence threshold check
            if confidence < self.confidence_threshold:
                return "Gesture not recognized. Please try again.", confidence
                
            return ALPHABET_CLASSES[max_idx], confidence
            
        except Exception as e:
            print(f"Alphabet inference error: {e}")
            return f"Inference Error: {str(e)}", 0.0

    def predict_phrase(self, sequence_landmarks_list):
        """
        Predict FSL-105 Sign from a sequence of 30 frames.
        """
        if self.phrase_model is None or not self.phrase_classes:
            return "Model not initialized", 0.0

        try:
            if len(sequence_landmarks_list) != 30:
                return f"Invalid sequence length. Expected 30 frames, got {len(sequence_landmarks_list)}", 0.0
                
            # 1. Use raw coordinates to match the training data format
            raw_seq = sequence_landmarks_list
                
            # 2. Add trajectory features and reshape to model input shape (1, 30, 69)
            input_data = np.expand_dims(add_phrase_motion_features(raw_seq), axis=0)
            
            # 3. Predict
            predictions = self.phrase_model.predict(input_data, verbose=0)[0]
            max_idx = int(np.argmax(predictions))
            confidence = float(predictions[max_idx])
            
            # 4. Confidence threshold check
            # For 105 classes, probability drops slightly as distribution widens, 65% is safe threshold.
            if confidence < self.confidence_threshold:
                return "Gesture not recognized. Please try again.", confidence
                
            predicted_label = self.phrase_classes[max_idx].strip()
            normalized_label = normalize_translation_label(predicted_label)
            filipino_phrase = FSL_FILIPINO_MAP_NORMALIZED.get(normalized_label, predicted_label)
            return filipino_phrase, confidence
            
        except Exception as e:
            print(f"Phrase inference error: {e}")
            return f"Inference Error: {str(e)}", 0.0

# Singleton instance of predictor
predictor_instance = FSLPredictor()
