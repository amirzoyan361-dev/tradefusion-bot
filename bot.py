import os
import time
import ccxt
import pandas as pd
import requests

from ta.momentum import RSIIndicator

BOT_TOKEN = os.getenv("BOT_TOKEN")
CHAT_ID = os.getenv("CHAT_ID")

exchange = ccxt.binance()

def send_message(text):

    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

    requests.post(url, data={
        "chat_id": CHAT_ID,
        "text": text
    })

while True:

    try:

        bars = exchange.fetch_ohlcv(
            'BTC/USDT',
            timeframe='15m',
            limit=100
        )

        df = pd.DataFrame(
            bars,
            columns=[
                'time',
                'open',
                'high',
                'low',
                'close',
                'volume'
            ]
        )

        rsi = RSIIndicator(df['close']).rsi()

        last_rsi = rsi.iloc[-1]

        price = df['close'].iloc[-1]

        if last_rsi < 30:

            send_message(
                f'🟢 BUY SIGNAL\n\nBTC/USDT\nPrice: {price}\nRSI: {round(last_rsi,2)}'
            )

        elif last_rsi > 70:

            send_message(
                f'🔴 SELL SIGNAL\n\nBTC/USDT\nPrice: {price}\nRSI: {round(last_rsi,2)}'
            )

        time.sleep(900)

    except Exception as e:

        print(e)

        time.sleep(60)