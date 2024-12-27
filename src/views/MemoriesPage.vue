<template>
    <div class="memories-page">
      <h1 class="title">Memories</h1>
      <div class="image-grid">
        <div 
          v-for="(image, index) in images" 
          :key="index" 
          class="image-container"
          :class="{ 'slide-left': index % 2 === 0, 'slide-right': index % 2 !== 0 }"
        >
          <img :src="image" alt="Memory" class="memory-image" />
        </div>
      </div>
  
      <!-- Floating message icon -->
      <div class="floating-icon" @click="openModal">
        💬
      </div>
  
      <!-- Modal -->
      <div v-if="showModal" class="modal">
  <div class="modal-content">
    <h2>Special Message</h2>
    <div class="modal-typing-text">
      {{ messages[currentMessageIndex].text }}
    </div>
    <img :src="currentGif" alt="Kilig GIF" class="kilig-gif" />
    <div class="modal-buttons">
      <button @click="nextMessage" v-if="currentMessageIndex < messages.length - 1">Next</button>
      <button @click="closeModal">Close</button>
    </div>
    <div v-if="currentMessageIndex === messages.length - 1" class="yes-button-container">
      <button class="yes-button" @click="goToMessagePage">Yes, please!</button>
    </div>
  </div>
</div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import audioFile13 from '@/assets/voices/13.mp3';
import audioFile4 from '@/assets/voices/4.mp3';
import audioFile5 from '@/assets/voices/5.mp3';
import audioFile6 from '@/assets/voices/6.mp3';
import audioFile7 from '@/assets/voices/7.mp3';
import audioFile8 from '@/assets/voices/8.mp3';
import audioFile10 from '@/assets/voices/10.mp3';
import audioFile11 from '@/assets/voices/11.mp3';
import kiligGif from '@/assets/gif/kilig.gif'; 
import WonderGif from '@/assets/gif/wondering.gif';
const currentGif = ref(kiligGif);
const router = useRouter(); // Router instance
  // Array of image paths
  const images = ref([
    new URL('@/assets/images/image (1).jpg', import.meta.url).href,
    new URL('@/assets/images/image (2).jpg', import.meta.url).href,
    new URL('@/assets/images/image (3).jpg', import.meta.url).href,
    new URL('@/assets/images/image (4).jpg', import.meta.url).href,
    new URL('@/assets/images/image (5).jpg', import.meta.url).href,
    new URL('@/assets/images/image (6).jpg', import.meta.url).href,
    new URL('@/assets/images/image (7).jpg', import.meta.url).href,
    new URL('@/assets/images/image (8).jpg', import.meta.url).href,
    new URL('@/assets/images/image (9).jpg', import.meta.url).href,
    new URL('@/assets/images/image (10).jpg', import.meta.url).href,
    new URL('@/assets/images/image (11).jpg', import.meta.url).href,
    new URL('@/assets/images/image (12).jpg', import.meta.url).href,
    new URL('@/assets/images/image (13).jpg', import.meta.url).href,
    new URL('@/assets/images/image (14).jpg', import.meta.url).href,
    new URL('@/assets/images/image (15).jpg', import.meta.url).href,
    new URL('@/assets/images/image (16).jpg', import.meta.url).href,
    new URL('@/assets/images/image (17).jpg', import.meta.url).href,
    new URL('@/assets/images/image (18).jpg', import.meta.url).href,
    new URL('@/assets/images/image (19).jpg', import.meta.url).href,
    new URL('@/assets/images/image (20).jpg', import.meta.url).href,
    new URL('@/assets/images/image (21).jpg', import.meta.url).href,
    new URL('@/assets/images/image (22).jpg', import.meta.url).href,
    new URL('@/assets/images/image (23).jpg', import.meta.url).href,
    new URL('@/assets/images/image (24).jpg', import.meta.url).href,
    new URL('@/assets/images/image (25).jpg', import.meta.url).href,
    new URL('@/assets/images/image (26).jpg', import.meta.url).href,
    new URL('@/assets/images/image (27).jpg', import.meta.url).href,
    new URL('@/assets/images/image (28).jpg', import.meta.url).href,
    new URL('@/assets/images/image (29).jpg', import.meta.url).href,
    new URL('@/assets/images/image (30).jpg', import.meta.url).href,
    new URL('@/assets/images/image (31).jpg', import.meta.url).href,
    new URL('@/assets/images/image (32).jpg', import.meta.url).href,
  ]);
  // Messages and corresponding audio files
const messages = ref([
  { text: "These are just a few of the precious memories you and Jhomer have shared. Each one holds a special place in his heart, reminding him of the love, joy, and connection you both shared. To him, these moments are cherished treasures that he will always hold close.", audio: audioFile13 },
  { text: "He doesn’t want all those happy moments to be just memories. They mean the world to him—you mean the world to him. He struggles to find the words to describe how lucky and happy he feels having someone as beautiful and amazing as you, Coreen, in his life.", audio: audioFile4 },
  { text: "Jhomer knows he made a mistake, one that led to your breakup. It’s something he deeply regrets. But that’s why he’s doing everything he can to make things right, to show you how much you mean to him, and to prove his serious and his feelings for you is true", audio: audioFile5 },
  { text: "Jhomer wants you to know, Coreen, that you are not just a part of his past but the dream of his future. Every smile, every laugh you shared is etched in his heart, and he can’t imagine life without your light.", audio: audioFile6 },
  { text: "He’s not perfect, but he’s learning, Coreen. Your love taught him how to be better, and he’s working hard to prove that he’s worthy of your love once again", audio: audioFile7 },
  { text: "Every little thing he’s doing now, creating me, revisiting your memories, and spending time with you is his way of showing you how much he values you.", audio: audioFile8 },
  { text: "You’ve changed his life in ways he never expected, Coreen. Your kindness, your love, your presence—it’s all irreplaceable. He knows this now more than ever.", audio: audioFile10 },
  { text: "Coreen, everything I’ve shared with you so far is just a small part of what Jhomer feels in his heart. There’s so much more he wishes he could say to you, but he poured it all into a letter he asked me to deliver. Would you like to read it?", audio: audioFile11 },
]);

const currentMessageIndex = ref(0); // Track the current message index

  // Preload all images
  const preloadImages = () => {
    images.value.forEach((imageUrl) => {
   const img = new Image();
      img.src = imageUrl;
    });
  };
  const playAudio = (audioFile) => {
  const audio = new Audio(audioFile);
  audio.play();
};
 
  // Observer to detect when images are in view
  const initObserver = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    });
  
    const imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach((container) => observer.observe(container));
  };
  
  // Modal management
  const showModal = ref(false); // State to manage modal visibility
  
  // Function to open the modal
  const openModal = () => {
  showModal.value = true;
  currentMessageIndex.value = 0; // Reset to the first message
  playAudio(messages.value[currentMessageIndex.value].audio); // Play the first audio
};
  // Function to close the modal
  const closeModal = () => {
  showModal.value = false;
};
const nextMessage = () => {
    currentGif.value = WonderGif;
  if (currentMessageIndex.value < messages.value.length - 1) {
    currentMessageIndex.value++;
    playAudio(messages.value[currentMessageIndex.value].audio); // Play the next audio
  }
};
const goToMessagePage = () => {
  router.push('/message');
}
  // Initialize the component
  onMounted(() => {
  preloadImages(); // Preload images when the component is mounted
  initObserver(); // Initialize the observer for animations
});
  </script>
  
  <style scoped>
  .memories-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fafaf7;
    padding: 20px;
    min-height: 100vh;
    overflow-x: hidden;
  }
  
  /* Title styling */
  .title {
    font-size: 36px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .image-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 1200px;
  }
  
  .image-container {
    position: relative;
    overflow: hidden;
    transform: translateY(100px);
    opacity: 0;
    transition: transform 0.8s ease, opacity 0.8s ease;
  }
  
  .image-container.slide-left {
    transform: translateX(-100%);
  }
  
  .image-container.slide-right {
    transform: translateX(100%);
  }
  
  .image-container.in-view {
    transform: translateX(0);
    opacity: 1;
  }
  
  .memory-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* Floating message icon */
  .floating-icon {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #FF42CD; /* Pink accent color */
    color: white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s;
  }
  
  .floating-icon:hover {
    background-color: #e6398a; /* Darker pink on hover */
  }
  
  /* Modal styles */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    position: relative;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 24px;
    cursor: pointer;
  }
  
  .modal-typing-text {
    margin-top: 20px;
    font-size: 18px;
    color: #333;
    text-align: center;

    overflow-wrap: break-word; /* Allow text to wrap */
  }
  
  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
  
  .kilig-gif {
    margin-top: 20px;
    width: 100%;
    max-width: 300px; /* Adjust as needed */
  }
  .modal-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
   align-items: center;
}

.modal-buttons button {
  background-color: #FF42CD; /* Pink accent color */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-buttons button:hover {
  background-color: #e6398a; /* Darker pink on hover */
}
.yes-button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Space above the button */
}

.yes-button {
  background-color: #FF42CD; /* Pink accent color */
  color: white;
  border: none;
  border-radius: 50px; /* Pill shape */
  padding: 15px 30px; /* Padding for a larger button */
  font-size: 18px; /* Font size */
  cursor: pointer;
  transition: background-color 0.3s;
}

.yes-button:hover {
  background-color: #e6398a; /* Darker pink on hover */
}
  </style>