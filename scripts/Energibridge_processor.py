import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
csv_path = BASE_DIR / "energibridge-logPost.csv"

df = pd.read_csv(csv_path)

print("Prime righe del CSV:")
print(df.head(), "\n")

print("Colonne disponibili:")
print(df.columns, "\n")

print("Statistiche principali:")

dram_total = df["DRAM_ENERGY (J)"].sum()
package_total = df["PACKAGE_ENERGY (J)"].sum()
pp0_total = df["PP0_ENERGY (J)"].sum()
pp1_total = df["PP1_ENERGY (J)"].sum()

print("DRAM energy totale (J):", dram_total)
print("Package energy totale (J):", package_total)
print("PP0 energy totale (J):", pp0_total)
print("PP1 energy totale (J):", pp1_total)

total_energy = dram_total + package_total + pp0_total + pp1_total
print("Energia totale complessiva (J):", total_energy)

print("\nMemoria totale (B):", df["TOTAL_MEMORY"].iloc[0])
print("Memoria usata massima (B):", df["USED_MEMORY"].max())
print("Swap totale (B):", df["TOTAL_SWAP"].iloc[0])
print("Swap usato massimo (B):", df["USED_SWAP"].max())

for i in range(4):
    print(f"\nCPU{i} frequenza media (MHz):", df[f"CPU_FREQUENCY_{i}"].mean())
    print(f"CPU{i} utilizzo medio (%):", df[f"CPU_USAGE_{i}"].mean())

plt.figure(figsize=(10,6))
plt.plot(df["Time"], df["DRAM_ENERGY (J)"], label="DRAM")
plt.plot(df["Time"], df["PACKAGE_ENERGY (J)"], label="Package")
plt.plot(df["Time"], df["PP0_ENERGY (J)"], label="PP0")
plt.plot(df["Time"], df["PP1_ENERGY (J)"], label="PP1")
plt.xlabel("Tempo")
plt.ylabel("Energia (J)")
plt.title("Andamento consumo energetico")
plt.legend()
plt.grid(True)
plt.show()
