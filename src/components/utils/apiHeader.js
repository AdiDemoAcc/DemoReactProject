export function generateHeader() {
  
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : JSON.parse({username : 'demo'})
  
  return {
    requestId:  self.crypto?.randomUUID?.() || generateUUIDFallback(),    // unique id
    timestamp: new Date().toISOString(),
    channel: "WEB",
    userId: user?.username || null
  };
}

function generateUUIDFallback() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}