import { createContext, useReducer } from 'react'
import { FaWindowMaximize } from 'react-icons/fa'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    //Get search results
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const res = await fetch(`${GITHUB_URL}/search/users?${params}`)
        const { items } = await res.json()

        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }

    //Get a single user
    const getUser = async (login) => {
        setLoading()

        const res = await fetch(`${GITHUB_URL}/users/${login}`)

        if (res.status === 404) {
            window.location = '/notfound'
        } else {
            const data = await res.json()

            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }
    }

    //Get user's public repos
    const getUserRepos = async (login) => {
        setLoading()

        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })

        const res = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`)
        const data = await res.json()

        dispatch({
            type: 'GET_REPOS',
            payload: data
        })
    }


    //Set loading 
    const setLoading = () => dispatch({
        type: 'SET_LOADING'
    })

    //Clear users
    const clearUsers = () => dispatch({
        type: 'CLEAR_USERS'
    })

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext