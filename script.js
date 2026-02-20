<div id="fishModal" class="fish-modal">
    <div class="modal-content-large">
        <span class="close-modal" onclick="closeDetails()">&times;</span>
        <div class="modal-left">
            <img id="modalImg" src="">
        </div>
        <div class="modal-right">
            <h2 id="modalTitle"></h2>
            <div class="price-box" id="modalPrice"></div>
            <div class="qty-box">
                <span>Quantity:</span>
                <input type="number" value="1" min="1" id="fishQty">
            </div>
            <button class="buy-now-btn" onclick="addToCartClick()">Add to my picks 🛒</button>
        </div>
    </div>
</div>