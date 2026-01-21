import streamlit as st
import google.generativeai as genai

# 配置页面
st.set_page_config(page_title="Style Genie", layout="wide")

# 尝试获取 API Key
try:
    api_key = st.secrets["GEMINI_API_KEY"]
    genai.configure(api_key=api_key)
except:
    st.warning("请在 Streamlit Settings 中配置 GEMINI_API_KEY")

st.title("👗 Style Genie - AI 私人穿搭管家")

menu = st.sidebar.radio("功能菜单", ["今日搭配", "我的衣橱", "灵感克隆"])

if menu == "今日搭配":
    mode = st.selectbox("选择模式", ["职场", "休闲", "约会"])
    color = st.text_input("选择主色调", "米色")
    if st.button("生成方案"):
        st.write(f"正在为您生成 {mode} 模式下的 {color} 系穿搭...")

elif menu == "我的衣橱":
    st.write("这里是你的数字衣橱（开发中）")

elif menu == "灵感克隆":
    st.write("上传图片，AI 将穿搭转移到你身上")
    st.file_uploader("上传灵感图")
