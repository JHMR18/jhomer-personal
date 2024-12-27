    <script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router'; // Import Vue Router
    import audioFile1 from '@/assets/voices/1.mp3';
    import audioFile2 from '@/assets/voices/2.mp3';
    import ruGif from '@/assets/gif/ru.gif';
    import kiligGif from '@/assets/gif/kilig.gif';

    const isLoading = ref(true);
    const showTypingText = ref(false);
    const typedText = ref('');
    const showButtons = ref(false);
    const showNextButton = ref(false); // Control visibility of "What message?" button
    const audio1 = ref(null);
    const audio2 = ref(null);
    const currentText = ref(1);
    const currentGif = ref(ruGif);

    const text1 = "hello. are you the beautiful girl named, coreen?";
    const text2 = "Hello, Coreen! My name is Jelly, a messenger lovingly created by Jhomer. He's feeling a bit shy, so he put his heart into making me to share this message with you.";
    let charIndex = 0;

    const router = useRouter(); // Router instance

    onMounted(() => {
    try {
        audio1.value = new Audio(audioFile1);
        audio2.value = new Audio(audioFile2);
        audio1.value.load();
        audio2.value.load();
    } catch (error) {
        console.error('Error loading audio:', error);
    }

    setTimeout(() => {
        isLoading.value = false;
    }, 2000);
    });

    const typeText = (text, callback) => {
    if (charIndex < text.length) {
        typedText.value += text.charAt(charIndex);
        charIndex++;
        setTimeout(() => typeText(text, callback), 50);
    } else if (callback) {
        callback(); // Invoke callback after typing finishes
    }
    };

    const handleHelloClick = async () => {
    showTypingText.value = true;
    try {
        if (audio1.value) {
        const playPromise = audio1.value.play();
        if (playPromise !== undefined) {
            await playPromise;
        }
        }
    } catch (error) {
        console.error('Error playing audio:', error);
    }
    typeText(text1, () => (showButtons.value = true));
    };

    const handleYesClick = async () => {
    typedText.value = '';
    charIndex = 0;
    currentText.value = 2;
    showButtons.value = false;
    currentGif.value = kiligGif;

    try {
        if (audio2.value) {
        const playPromise = audio2.value.play();
        if (playPromise !== undefined) {
            await playPromise;
        }
        }
    } catch (error) {
        console.error('Error playing audio:', error);
    }
    typeText(text2, () => (showNextButton.value = true)); // Show "What message?" button after typing
    };

    const goToMemories = () => {
    router.push('/memories'); // Navigate to "Memories" page
    };
    </script>

    <template>
    <div class="homepage">
        <transition name="fade">
        <div v-if="isLoading" class="loading-screen">
            <div class="heart"></div>
        </div>
        </transition>

        <div class="main-content">
        <div v-if="showTypingText" class="typing-text">
            {{ typedText }}
        </div>

        <transition name="fade" mode="out-in">
            <img :key="currentGif" :src="currentGif" alt="Cute Cat" class="cat-gif" />
        </transition>

        <div class="button-container">
            <button v-if="!showTypingText" class="hello-btn" @click="handleHelloClick">
            Hello
            </button>

            <template v-if="showButtons">
            <button class="response-btn yes-btn" @click="handleYesClick">Yes</button>
            <!-- <button class="response-btn no-btn">No</button> -->
            </template>

            <button v-if="showNextButton" class="next-btn" @click="goToMemories">
            Next
            </button>
        </div>
        </div>
    </div>
    </template>

    <style scoped>
    /* Existing styles remain the same */
    .homepage {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFCCE1;
    overflow: hidden;
    }

    .loading-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #FFCCE1;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    }

    .heart {
    width: 100px;
    height: 100px;
    background-color: red;
    position: relative;
    transform: rotate(-45deg);
    animation: beat 1s infinite;
    }

    .heart:before,
    .heart:after {
    content: '';
    width: 100px;
    height: 100px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    }

    .heart:before {
    top: -50px;
    left: 0;
    }

    .heart:after {
    top: 0;
    left: 50px;
    }

    @keyframes beat {
    0%, 100% {
        transform: scale(1) rotate(-45deg);
    }
    50% {
        transform: scale(1.2) rotate(-45deg);
    }
    }

    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
    opacity: 0;
    }

    .main-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 100%;
    background-color: #fafaf7;
    position: relative;
    overflow: hidden;
    }

    .cat-gif {
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-bottom: 20px;
    }
    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 0.5s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
    opacity: 0;
    }

    /* New styles for typing text */
    .typing-text {
    font-size: 20px;
    margin-bottom: 20px;
    min-height: 36px;
    color: #333;
    max-width: 900px;
    text-align: center;
    line-height: 1.5;
    white-space: pre-wrap;
    padding: 0 20px;
    }
    /* Button styles */
    .button-container {
    display: flex;
    gap: 20px;
    }

    .hello-btn {
    background-color: #FFCCE1;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    padding: 10px 20px;
    height: 50px;
    width: 100px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .response-btn {
    background-color: #FFCCE1;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    padding: 10px 20px;
    height: 50px;
    width: 100px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .yes-btn {
    background-color: #77dd77;
    }

    .no-btn {
    background-color: #ff6b6b;
    }
    .next-btn {
    background-color: #FFC0CB; /* Light pink */
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    padding: 10px 20px;
    height: 50px;
    width: 150px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.2s ease;
    }
    .next-btn:hover {
    transform: scale(1.05);
    }

    .next-btn:active {
    transform: scale(0.95);
    }
    .hello-btn:hover,
    .response-btn:hover {
    transform: scale(1.05);
    }

    .hello-btn:active,
    .response-btn:active {
    transform: scale(0.95);
    }
    </style>