<template>
    <header id="header">
        <div class="search-and-control">
            <div class="container">
                <div class="brand">
                    <router-link to="/home">
                        T.B.S.
                    </router-link>
                    <button class="btn-menu" @click.prevent="this.$store.state.showSideMenu = true">
                        <img src="@/assets/imgs/icons/menu.png" alt="Menu">
                    </button>
                </div>
                <div class="search">
                    <form class="search-form" @submit.prevent="search">
                        <button type="submit">
                            <img src="@/assets/imgs/icons/search.png" alt="Search">
                        </button>
                        <input type="search" placeholder="Search..." v-model="searchText">
                    </form>
                </div>
                <div class="control">
                    <ul class="nav-control">
                        <li class="nav-item">
                            <router-link to="/auth" v-if="!user">
                                <img src="@/assets/imgs/icons/auth.png" alt="Login / Register">
                            </router-link>
                            <a href v-else>
                                <img src="@/assets/imgs/icons/user.png" alt="User">
                            </a>
                            <ul class="dropdown" v-if="user">
                                <li class="dropdown-item">
                                    <a href @click.prevent="logout">
                                        Logout
                                    </a>
                                </li>
                            </ul>
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
        <div class="menu" :class="{ show: showSideMenu }">
            <div class="container">
                <button v-if="showSideMenu" class="btn-close" @click.prevent="this.$store.state.showSideMenu = false">
                    <img src="@/assets/imgs/icons/close.png" alt="Close">
                </button>
                <ul class="nav-menu">
                    <li class="nav-item">
                        <router-link to="/home">
                            Home
                        </router-link>
                    </li>
                    <li class="nav-item nav-item-dropdown" v-if="categories.length > 0">
                        <a>
                            Categories
                            <img src="@/assets/imgs/icons/down-arrow.png">
                        </a>
                        <ul class="dropdown">
                            <li class="dropdown-item" v-for="c in categories" :key="c.id">
                                <a href @click.prevent="selectCategory(c.id)">
                                    {{ c.name }}
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item nav-item-dropdown" v-if="collections.length > 0">
                        <a>
                            Collections
                            <img src="@/assets/imgs/icons/down-arrow.png">
                        </a>
                        <ul class="dropdown">
                            <li class="dropdown-item" v-for="c in collections" :key="c.id">
                                <a href @click.prevent="selectCollection(c.id)">
                                    {{ c.name }}
                                </a>
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
import categories from '@/services/categories.service'
import collections from '@/services/collections.service';
import { mapState } from 'vuex';
export default {
    name: 'HeaderTemplate',
    computed: mapState(['user', 'categories', 'collections', 'showSideMenu']),
    data: function () {
        return {
            searchText: ""
        }
    },
    methods: {
        loadCategories () {
            categories.get().then(res => this.$store.commit('setCategories', res.data)).catch(err => console.log(err))
        },
        selectCategory (cid) {
            this.$router.push({ name: 'category', params: { cid: cid } })
        },
        loadCollections () {
            collections.get().then(res => this.$store.commit('setCollections', res.data)).catch(err => console.log(err))
        },
        selectCollection (cid) {
            this.$router.push({ name: 'collection', params: { cid: cid } })
        },
        search () {
            if (this.searchText) {
                this.$router.push({
                    name: 'search',
                    params: {
                        search: this.searchText
                    }
                })
            }
        },
        logout () {
            localStorage.clear()
            this.$store.commit('setUser', null)
        }
    },
    mounted () {
        this.loadCategories()
        this.loadCollections()
    }
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
    margin: 0; padding: 0;
    display: flex; align-items: center;
    justify-content: center;
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
    background-color: var(--color-theme);
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

.brand, .control {
    width: 80px;
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

.nav-menu .nav-item {
    margin: 0 10px;
}

.nav-menu a {
    color: white;
    text-decoration: none;
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
    z-index: 999;

    display: none; flex-direction: column;
    justify-content: center; align-items: start;

    width: max-content; position: absolute;
    background-color: var(--color-theme);
}

.dropdown .dropdown-item {
    width: 100%;
    padding: 5px 0;
}

.dropdown .dropdown-item:not(:last-child) {
    border-bottom: 1px dashed #454545;
}

.control .nav-item .dropdown {
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.control .nav-item .dropdown a {
    color: #252525;
    text-decoration: none;
    font-family: roboto-regular;
}

.control .nav-item .dropdown a:hover {
    text-decoration: underline;
}

.nav-item-dropdown:hover .dropdown {
    display: flex;
}

.control .nav-item:hover .dropdown {
    display: flex;
}

.nav-item-dropdown img {
    width: 24px;
}

.btn-close {
    display: none;
    border: none; background: transparent;
    margin: 15px; padding: 0;
    align-self: flex-end;
}

.btn-menu {
    display: none;
    border: none; background: transparent;
}

@media (max-width: 572px) {
    header {
        height: calc(6 * var(--header-h) / 10);
    }

    .search-and-control .container {
        width: 100%;
    }

    .control {
        margin: 0 10px;
    }

    .menu {
        z-index: 999; position: absolute;
        max-width: 300px; width: 100%; inset: 0;
        
        align-items: flex-start;
        display: none;
    }

    .menu.show {
        display: flex;
    }

    .menu .container {
        width: 100%; height: 100%;
        display: flex; flex-direction: column;
        justify-content: flex-start;
    }

    .nav-menu {
        width: 100%; height: auto;
        flex-direction: column;
        align-items: flex-start;
    }

    .nav-menu .nav-item {
        margin: 4px 10px;
    }

    .btn-menu, .btn-close {
        display: block;
    }

    .brand a {
        display: none;
    }
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