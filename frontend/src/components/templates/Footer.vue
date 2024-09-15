<template>
    <footer id="footer">
        <div class="container">
            <div class="informations col">
                <h2>Imformations</h2>
                <ul class="list">
                    <li>
                        <a href>Who we are</a>
                    </li>
                    <li>
                        <a href>Delivery times and procedures</a>
                    </li>
                    <li>
                        <a href>Security</a>
                    </li>
                    <li>
                        <a href>Privacy Policy</a>
                    </li>
                    <li>
                        <a href>Exchange Policy</a>
                    </li>
                </ul>
            </div>
            <div class="client-services col">
                <h2>Client Services</h2>
                <ul class="list">
                    <li>
                        <a href>Contact us</a>
                    </li>
                    <li>
                        <a href>Site map</a>
                    </li>
                    <li>
                        <a href>Our stores</a>
                    </li>
                    <li>
                        <a href>Events</a>
                    </li>
                    <li>
                        <a href>Work with us</a>
                    </li>
                    <li>
                        <a href>Magazine</a>
                    </li>
                    <li>
                        <a href>Always reading</a>
                    </li>
                </ul>
            </div>
            <div class="my-account col">
                <h2>My Account</h2>
                <ul class="list">
                    <li>
                        <a href>My account</a>
                    </li>
                    <li>
                        <a href>Order history</a>
                    </li>
                    <li>
                        <a href>Wish list</a>
                    </li>
                    <li>
                        <a href>Informative</a>
                    </li>
                </ul>
            </div>
            <div class="talk-to-us col">
                <h2>Talk to us</h2>
                <ul class="list">
                    <li>
                        <a href>(99) 9 9999-9999</a>
                    </li>
                    <li>
                        <a href>(99) 9 9999-9999</a>
                    </li>
                    <li>
                        <a href>example@tbs.com.br</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterTemplate'
}
</script>

<style scoped>
footer#footer {
    border-top: 1px solid #aaa;
    margin: 40px 20px;
}

.container {
    max-width: 1200px; width: 100%;
    margin: 0 auto; padding: 20px 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center; align-items: start;
}

.container .col {
    display: flex; flex-direction: column;
    justify-content: start; align-items: start;
    width: fit-content;
}

.list {
    list-style: none;
    padding: 0; margin: 0;
}

h2 {
    margin: 10px 0;
    font-size: 0.9rem;
    font-family: roboto-regular;
}

.list li {
    margin: 5px 0;
}

.list li a {
    text-decoration: none;
    color: #444;
}

.list li a:hover {
    text-decoration: underline;
}

@media (max-width: 700px) {
    .container {
        grid-template-columns: repeat(2, 1fr);
        justify-items: center;
    }

    .container .col {
        max-width: 200px; width: 100%;
        margin-left: 20px;
    }
}

@media (max-width: 400px) {
    .container .col {
        margin-left: 0;
    }
}
</style>