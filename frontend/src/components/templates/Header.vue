<template>
    <header id="header">
        <div class="search-and-control">
            <div class="container">
                <div class="brand">
                    <router-link to="/home">
                        T.B.S.
                    </router-link>
                </div>
                <div class="search">
                    <form class="search-form">
                        <button type="submit">
                            <img src="@/assets/imgs/icons/search.png" alt="Search">
                        </button>
                        <input type="search" placeholder="Search..." v-model="search">
                    </form>
                </div>
                <div class="control">
                    <ul class="nav-control">
                        <li class="nav-item">
                            <router-link to="/auth">
                                <img src="@/assets/imgs/icons/user.png" alt="Login / Register">
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/favorites">
                                <img src="@/assets/imgs/icons/favorites.png" alt="Favorites">
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/cart">
                                <img src="@/assets/imgs/icons/bag.png" alt="Cart">
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="menu">
            <div class="container">
                <ul class="nav-menu">
                    <li class="nav-item">
                        <router-link to="/home">
                            Home
                        </router-link>
                    </li>
                    <li class="nav-item nav-item-dropdown">
                        <a href="#">
                            Categories
                            <img src="@/assets/imgs/icons/down-arrow.png">
                        </a>
                        <ul class="dropdown">
                            <li class="dropdown-item">
                                <router-link>
                                    Categoria 1
                                </router-link>
                            </li>
                            <li class="dropdown-item">
                                <router-link>
                                    Categoria 2
                                </router-link>
                            </li>
                            <li class="dropdown-item">
                                <router-link>
                                    Categoria 3
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link to="/about">
                            About
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/contact">
                            Contact
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderTemplate'
}
</script>

<style scoped>
/* general */
header {
    margin: 0; padding: 0;
    height: var(--header-h); inset: 0;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    background-color: #fff;
}

.control, .nav-control, .search, .brand {
    display: flex; align-items: center;
}

.search-and-control {
    width: 100%; height: 100%;
    padding: 0; margin: 0;
    
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-and-control .container {
    width: 90%; height: calc(6 * var(--header-h) / 10);
    display: flex; flex-direction: row;
    align-items: center; justify-content: space-between;
}

.menu {
    background-color: #C96868;
    width: 100%; height: 100%;
    padding: 0; margin: 0;
    
    display: flex;
    justify-content: center;
    align-items: center;
}

.menu .container {
    width: 90%; height: calc(4 * var(--header-h) / 10);
    display: flex; flex-direction: row;
    align-items: center; justify-content: center;
}


/* nav-control */
.nav-control {
    margin: 0; padding: 0;
    list-style: none;
}

.nav-control .nav-item a img {
    margin: 0; padding: 0;
    width: 20px; height: 20px;
}

.nav-control .nav-item:not(:first-child) {
    margin-left: 10px;
}

/* search */
.search {
    width: 100%;
    max-width: 500px;
    margin: 0 20px;
}

.search-form {
    width: 100%;
    display: flex;
    border-bottom: 2px solid #ddd;
    padding-bottom: 4px;
}

.search-form input {
    flex-grow: 1;
    border: none; outline: none;
    color: #252525;
    padding: 5px 10px;
    font-size: 0.9rem;
}

.search-form input::-webkit-search-cancel-button {
    -webkit-appearance: none; cursor: pointer;

    height: 14px; width: 14px;
    background-image: url(../../assets/imgs/icons/close.png);
    background-size: cover;
}

.search-form button {
    border: none; background: transparent;
    display: flex; align-items: center;
    cursor: pointer; padding: 0; margin: 0;
}

/* brand */
.brand a {
    text-decoration: none; color: #454545;
    font-weight: 600;
    font-size: 1.2rem;
}


/* menu */
.nav-menu {
    height: 100%; width: 100%;
    
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0; margin: 0;

    list-style: none;
}

.nav-menu .nav-item:not(:first-child) {
    margin-left: 10px;
}

.nav-menu a {
    text-decoration: none; color: #151515;
    text-transform: uppercase;
    display: flex; align-items: center;
}

.nav-menu a:hover {
    color: white;
}

.nav-menu .nav-item {
    position: relative;
}

.dropdown {
    list-style: none;
    padding: 7px 12px; margin: 0;

    display: none; flex-direction: column;
    justify-content: center; align-items: center;

    width: max-content; position: absolute;
    background-color: #C96868;
}

.dropdown .dropdown-item {
    padding: 5px 0;
}

.dropdown .dropdown-item:not(:last-child) {
    border-bottom: 1px dashed #454545;
}

.nav-item-dropdown:hover .dropdown {
    display: flex;
}

.nav-item-dropdown img {
    width: 24px;
}

@media (max-width: 480px) {
    .container {
        width: 100%;
    }

    .search-form input {
        width: 100%;
    }

    .nav-menu {
        font-size: 0.9rem;
    }
}
</style>