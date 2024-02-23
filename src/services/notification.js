// import { useWebSocket } from '@vueuse/core';
// import { ref, computed } from 'vue';
// import { useAsyncState } from '@vueuse/core';
// import { jwtApi } from 'src/boot/axios-config';
// import { useAuthStore } from 'src/stores/auth';

// async function getNotifications() {
//   return await jwtApi.get('notification/');
// }

// export async function putReadNotification(notId) {
//   return await jwtApi.patch(`notification/${notId}`);
// }

// export const useNotification = () => {
//   const authStore = useAuthStore();
//   const messages = ref([]);
//   const uid = computed(() => {
//     return authStore.loginUser?.uid || null;
//   });

//   if (uid.value) {
//     const { execute } = useAsyncState(getNotifications, [], {
//       immediate: false,
//       throwError: true,
//       onSuccess: response => {},
//       onError: err => {},
//     });
//     const { close, open, error, status } = useWebSocket(
//       `ws://127.0.0.1:8000/notification?uid=${uid.value}`,
//       {
//         onConnected: async ws => {
//           try {
//             const notifications = await execute();
//             messages.value = notifications.data;
//           } catch (error) {
//             console.error(error);
//           }
//         },
//         onDisconnected: (ws, event) => {
//           if (event.code == 4001) {
//             console.log('Authentication Error');
//           }
//         },
//         onMessage: (ws, msg) => {
//           const newData = JSON.parse(msg.data);
//           messages.value = [newData.data, ...messages.value];
//         },
//         onError: (ws, msg) => {},
//       },
//     );
//     return {
//       status,
//       messages,
//       open,
//       close,
//       error,
//     };
//   }
// };
