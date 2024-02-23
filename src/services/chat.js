// import { useWebSocket } from '@vueuse/core';
// import { ref, computed } from 'vue';
// import { useAsyncState } from '@vueuse/core';
// import { jwtApi } from 'src/boot/axios-config';
// import { useAuthStore } from 'src/stores/auth';
// export async function getChats() {
//   return await jwtApi.get('webchat/');
// }

// export const useWebChat = () => {
//   const authStore = useAuthStore();
//   const messages = ref([]);
//   const uid = computed(() => {
//     return authStore.loginUser?.uid || null;
//   });

//   if (uid.value) {
//     const { execute } = useAsyncState(getChats, [], {
//       immediate: false,
//       throwError: true,
//       onSuccess: response => {},
//       onError: err => {},
//     });
//     const { send, close, open, error, status } = useWebSocket(
//       `ws://127.0.0.1:8000/webchat?uid=${uid.value}`,
//       {
//         onConnected: async ws => {
//           try {
//             const chats = await execute();
//             messages.value = chats.data;
//           } catch (error) {
//             console.log(error);
//           }
//         },
//         onDisconnected: (ws, event) => {
//           if (event.code == 4001) {
//             console.log('Authentication Error');
//           }
//         },
//         onMessage: (ws, msg) => {
//           const newData = JSON.parse(msg.data);
//           messages.value = [...messages.value, newData.new_message];
//         },
//         onError: (ws, msg) => {},
//       },
//     );
//     return {
//       status,
//       messages,
//       send,
//       open,
//       close,
//       error,
//     };
//   }
// };
