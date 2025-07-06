import { useState } from "react";
import { ConnectButton } from "@thirdweb-dev/react";
import Head from "next/head";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    symbol: "",
    supply: "",
    description: "",
    image: null,
    revokeMint: true,
    revokeUpdate: true,
    revokeFreeze: true,
    network: "devnet",
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    const response = await fetch("/api/mint", {
      method: "POST",
      body: data,
    });

    const result = await response.json();
    alert(result.message || "Token minted successfully!");
  };

  return (
    <>
      <Head>
        <title>Project Meme Coin</title>
      </Head>
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">
          <h1 className="text-2xl font-bold mb-4">🚀 Launch Your Meme Coin</h1>
          <ConnectButton />
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input type="text" name="name" placeholder="Token Name" onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="text" name="symbol" placeholder="Symbol" onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="number" name="supply" placeholder="Total Supply" onChange={handleChange} className="w-full p-2 border rounded" required />
            <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
            <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full p-2" required />

            <div className="flex items-center space-x-2">
              <input type="checkbox" name="revokeMint" checked={form.revokeMint} onChange={handleChange} />
              <label>Revoke Mint Authority</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" name="revokeUpdate" checked={form.revokeUpdate} onChange={handleChange} />
              <label>Revoke Update Authority</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" name="revokeFreeze" checked={form.revokeFreeze} onChange={handleChange} />
              <label>Revoke Freeze Authority</label>
            </div>

            <div className="flex items-center space-x-2">
              <label>Network:</label>
              <select name="network" value={form.network} onChange={handleChange} className="border p-1 rounded">
                <option value="devnet">Devnet</option>
                <option value="mainnet">Mainnet</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-black text-white py-2 rounded-xl">Mint Token</button>
          </form>
        </div>
      </main>
    </>
  );
}