// 預設資料
const users = [
    { ID: 'fish001', Display:'clf', Material: 'selmon', Custom: '1', Head64: '', Biome: 'plain', minSize:'100', maxSize: '1000', Lore:'Y'}
];

const List = document.getElementById('List');

// 函式 - 渲染列表
function renderList() {
    List.innerHTML = ''; // 清空列表
    users.forEach(fish => {
        const li = document.createElement('li');
        li.innerHTML = 
            `<br>&nbsp;&nbsp;&nbsp;&nbsp;` +
            `${fish.ID}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
            `displayname:&nbsp;'${fish.Display}'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
            `item:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`
            
        if(fish.Material || fish.Custom){
            if(fish.Custom){
                li.innerHTML += `material:&nbsp;${fish.Material}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
                                `custom-model-data:&nbsp;${fish.Custom}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
            }
            else{
                li.innerHTML += `material:&nbsp;${fish.Material}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
            }
        }
        else if(fish.Head64){
            li.innerHTML += `head-64:&nbsp;'${fish.Head64}'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
        }

        if(fish.Biome){
            li.innerHTML += `biome:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
                            `-&nbsp;'${fish.Biome}'<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
        }

        if(fish.minSize || fish.maxSize){
            if(!fish.maxSize){
                fish.maxSize = fish.minSize;
            }
            else if(!fish.minSize){
                fish.minSize = fish.maxSize;
            }
            li.innerHTML += `size:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
                            `maxSize:&nbsp${fish.maxSize}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
                            `minSize:&nbsp${fish.minSize}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
        }
        if(fish.Lore){
            li.innerHTML += `lore:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;` +
                            `-&nbsp;'${fish.Lore}'`;
        }
        // 創建複製按鈕並添加到列表項中
        const copyButton = document.createElement('button');
        copyButton.textContent = '複製';
        copyButton.classList.add('copy-btn'); // 添加 class

        // 添加事件監聽器到複製按鈕
        copyButton.addEventListener('click', function() {
            // 獲取當前列表項內容
            //const textToCopy = ``;
            const listItem = this.parentElement; // 獲取這個按鈕的父元素 <li>
            var textToCopy = listItem.innerHTML.replace('<button class="copy-btn">複製</button>', '').trim(); // 或者使用 listItem.textContent 如果只想獲取文本
            // 將 &nbsp; 替換為空格，將 <br> 替換為換行符
            textToCopy = textToCopy
                .replace(/&nbsp;/g, ' ') // 使用正則表達式替換 &nbsp;
                .replace(/<br\s*\/?>/g, '\n'); // 替換 <br> 標籤為換行符


            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    const messageDiv = document.getElementById('message');
                    messageDiv.textContent = `已複製: ${textToCopy}`;
                    setTimeout(() => messageDiv.textContent = '', 2000); // 2秒後清除消息
                })
                .catch(err => {
                    console.error('複製失敗:', err);
                });
        });

        li.appendChild(copyButton); // 將按鈕添加到列表項中
        List.appendChild(li); // 將列表項添加到列表中
    });
}

// 渲染初始列表值
renderList();

// Add new user functionality
const addUserButton = document.getElementById('addButton');
addUserButton.addEventListener('click', () => {
    const tID = document.getElementById('ID').value;
    const tDisplay = document.getElementById('Display').value;
    const tMaterial = document.getElementById('Material').value;
    const tCustom = document.getElementById('Custom').value;
    const tHead64 = document.getElementById('Head64').value;
    const tBiome = document.getElementById('Biome').value;
    const tminSize = document.getElementById('minSize').value;
    const tmaxSize = document.getElementById('maxSize').value;
    const tLore = document.getElementById('Lore').value;

    if (tID) {
        users.push({ ID: tID, Display: tDisplay, Material: tMaterial, Custom: tCustom, Head64: tHead64, Biome: tBiome, minSize: tminSize, maxSize: tmaxSize, Lore: tLore});
        renderList();

        // Clear input fields
        document.getElementById('ID').value = '';
        document.getElementById('Material').value = '';
        document.getElementById('Display').value = '';
        document.getElementById('Material').value = '';
        document.getElementById('Custom').value = '';
        document.getElementById('Head64').value = '';
        document.getElementById('Biome').value = '';
        document.getElementById('minSize').value = '';
        document.getElementById('maxSize').value = '';
        document.getElementById('Lore').value = '';
    }
    else {
        alert('ID為必填，且不可重複');
    }
});
