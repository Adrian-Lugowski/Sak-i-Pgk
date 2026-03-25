# lab05

## Co zostało zrealizowane
W ramach laboratorium zaimplementowano sterowanie statkiem kosmicznym przy użyciu biblioteki Raylib w języku Python. Projekt został podzielony na główną pętlę gry (`main.py`) oraz klasę obiektu (`ship.py`). Zrealizowano następujące mechaniki:
* Obliczanie pozycji wierzchołków statku za pomocą macierzy rotacji 2D.
* Model kinematyczny uwzględniający pęd, tarcie (stopniowe wytracanie prędkości) oraz limit prędkości.
* Pełna niezależność fizyki od liczby klatek na sekundę dzięki użyciu `delta time` (dt).
* Dodatkowo zaimplementowano hamulec awaryjny (klawisz Z), animację płomienia silnika oraz odbijanie się statku od krawędzi ekranu.

## Uruchomienie
Do uruchomienia projektu wymagany jest interpreter środowiska Python oraz zainstalowana paczka `raylib`. 

1. Zainstaluj wymagane zależności komendą: `pip install raylib`
2. Uruchom grę wpisując w terminalu: `python main.py`
