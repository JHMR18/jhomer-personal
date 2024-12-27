<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import emailjs from 'emailjs-com'; // Import EmailJS
import audioFile from '@/assets/voices/12.mp3';
import endGif from '@/assets/gif/end.gif';

const typedText = ref('');
const charIndex = ref(0);
const audio = ref(null);
const userMessage = ref('');
const isTyping = ref(true);
const textToType = "So how did it went? Do you have an answer for Jhomer? Put your answer here and I will send it to him.";

const router = useRouter();

onMounted(() => {
    try {
        audio.value = new Audio(audioFile);
        audio.value.load();
        audio.value.play().catch((error) => {
            console.error('Error playing audio:', error);
        });
    } catch (error) {
        console.error('Error loading audio:', error);
    }

    typeText();
});

const typeText = () => {
    if (charIndex.value < textToType.length) {
        typedText.value += textToType.charAt(charIndex.value);
        charIndex.value++;
        setTimeout(typeText, 50);
    } else {
        isTyping.value = false;
    }
};

const sendMessage = () => {
    const templateParams = {
        from_name: 'User ', // You can replace this with the user's name if needed
        to_email: 'opulenciajhomer@gmail.com', // Your email address
        message: userMessage.value,
    };

    emailjs.send('service_prg9236', 'template_ys8h6qq', templateParams, 'duiGSbF60gmVPkWGa')
        .then((response) => {
            console.log('Email sent successfully:', response.status, response.text);
            alert("Your message has been sent to Jhomer!");
            userMessage.value = ''; // Clear the message box
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            alert("There was an error sending your message. Please try again.");
        });
};
</script>

<template>
<div class="response-page">
    <div class="typing-text" v-if="isTyping">{{ typedText }}</div>
    <div class="typing-text" v-else>{{ typedText }}</div>
    <img :src="endGif" alt="End Gif" class="end-gif" />

    <div class="message-box">
        <textarea v-model="userMessage" placeholder="Type your message here..." rows="4"></textarea>
        <button @click="sendMessage" class="send-btn">Send</button>
    </div>
</div>
</template>

<style scoped>
.response-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #fafafa;
    padding: 20px;
    text-align: center;
}

.typing-text {
    font-size: 20px;
    margin-bottom: 20px;
    max-width: 800px;
    line-height: 1.5;
    color: #333;
}

.end-gif {
    width: 300px;
    height: auto;
    margin-bottom: 20px;
}

.message-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    max-width: 500px;
}

textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    resize: none;
    outline: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.send-btn {
    background-color: #77dd77;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.send-btn:hover {
    background-color: #5cb85c;
}

.send-btn:active {
    transform: scale(0.98);
}
</style>