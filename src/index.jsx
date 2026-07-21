import React, { useState } from 'react';
import axios from 'axios';

// Kuvuta picha zilizotolewa
const images = [
  {
    id: 1,
    title: "Mkutano wa TANU 1957",
    desc: "Mwaka 1957 Agosti, TANU Dar es Salaam. Sheikhe Kaluta Amri Abedi na Mhe. Julius Nyerere.",
    url: "https://z-cdn-media.chatglm.cn/files/a7afb315-caf7-4a7d-b39e-13aafbe6c25b.jpeg?auth_key=1884653378-e1a348b954484dae9cbb10ec07efe9a1-0-d8c0217bd3aafbb80a0c2824a9889794"
  },
  {
    id: 2,
    title: "Peter Colmore",
    desc: "Peter Colmore Mzungu Mswahili wa Kenya na Tanganyika.",
    url: "https://z-cdn-media.chatglm.cn/files/f1a39ad8-c2f0-40c2-b66d-656c5ee5329e.jpg?auth_key=1884653378-a47901c243ff42b2a52858ce825589d4-0-37d2406d5a503f3d5c95a06e9d1ed697"
  },
  {
    id: 3,
    title: "Mazingira ya Utafiti",
    desc: "Watafiti wakishikilia kitabu kijani kwenye maktaba.",
    url: "https://z-cdn-media.chatglm.cn/files/02b720cd-c29a-4f33-8852-0c7a840e92c6.jpg?auth_key=1884653378-c57195e386f74214bdb294b85b9c0df6-0-646f90a4106e42d4a11bc3c899777eee"
  },
  {
    id: 4,
    title: "Mzee wa Kihistoria",
    desc: "Picha ya mzee akiwa amekaa kwenye mazingira tulivu.",
    url: "https://z-cdn-media.chatglm.cn/files/e257fae5-9d74-4b52-a27c-67e42e01244e.jpg?auth_key=1884653378-37ae9267c4e044f094573682f384fbf5-0-bdd13c5ff9e54ef8ac7b9b970ce3659e"
  }
];

const SecureAWSStoreApp = () => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSecurePayment = async () => {
    setLoading(true);
    try {
      // Unamuunganisha na Backend yako salama (Node.js) inayoshikilia AWS SDK
      const response = await axios.post('https://your-api-gateway-url.com/api/process-payment', {
        amount: 1000, // Bei ya bidhaa
        currency: 'TZS'
      });
      
      if (response.data.success) {
        setPaymentStatus("Malipo yamekamilika salama! Data imehifadhiwa AWS.");
      }
    } catch (error) {
      setPaymentStatus("Hitilafu imetokea wakati wa malipo. Jaribu tena.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Kumbuka Historia Na Kulipia Huduma Salama</h1>
        
        {/* Sehemu ya Picha */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {images.map((img) => (
            <div key={img.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300">
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="font-bold text-lg mb-2">{img.title}</h2>
                <p className="text-gray-600 text-sm">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sehemu ya Malipo ya AWS Data Store */}
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Lipia Karatasi za Historia</h2>
          <p className="text-gray-600 mb-6">Lipia salama kupitia mfumo wa AWS uliohifadhiwa kwa usalama wa hali ya juu.</p>
          <button 
            onClick={handleSecurePayment}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Inashughulikia...' : 'Lipa Sasa (AWS Secure)'}
          </button>
          {paymentStatus && <p className="mt-4 text-green-600 font-semibold">{paymentStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default SecureAWSStoreApp;
