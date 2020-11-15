import  axios from 'axios'
import React from'react'
import Header from './Header';
import Footer from './Footer'
import Content from './Content'




function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
}

console.log('lanuage is : ' + getQueryVariable('language'))


export default class App extends React.Component {
    constructor(props) {
        super(props)
        const cards = [

        ]
        this.state = { cards, loading: false, error: null, type: 'all', page: 1 }
    }
    handleNavClick = async (type = 'all', page = 1, pushState = true) => {
        const {cards} = this.state
        console.log('type', type)
        var url = ''
        switch (type) {
            case 'Javascript':
                url = 'https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&sort=stars&order=desc&type=Repositories'
                break;
            case 'Ruby':
                url = 'https://api.github.com/search/repositories?q=stars:%3E1+language:ruby&sort=stars&order=desc&type=Repositories'
                break;
            case 'Java':
                url = 'https://api.github.com/search/repositories?q=stars:%3E1+language:java&sort=stars&order=desc&type=Repositories'
                break;
            case 'Css':
                url = 'https://api.github.com/search/repositories?q=stars:%3E1+language:css&sort=stars&order=desc&type=Repositories'
                break;
            default:
                url = 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories'
        }
        url = `${url}&page=${page}&per_page=10`
        try {
            var beforeState = { type, loading: true, error: null, lang: type }
            if (page === 1) {
                beforeState.cards = []
            }
            if (pushState) {
                window.history.pushState('', '', `?language=${type}`)
            }
            //window.location.search = `?language=${type}`
            this.setState(beforeState)
            const res = await axios.get(url)
           
            console.log('res', res.data)
            const newCards = res.data.items.map((item, key) => ({
                no: 'No.' + (page === 1 ? 1 + key : cards.length + 1 + key),
                img: item.owner.avatar_url,
                title: item.full_name,
                author: item.owner.login,
                stars: item.stargazers_count,
                forks: item.forks,
                issues: item.open_issues,
                url: item.html_url

            }))
            if (page > 1) {
                this.setState((state, props) => {
                    return { cards: [...state.cards, ...newCards], loading: false, page }
                })
            } else {
                this.setState({ cards: newCards, loading: false, page })
            }
        } catch (e) {
            // this.setState({ loading: false, error: e })
        }
    }
    loadMore = () => {
        const { type, page } = this.state
        this.handleNavClick(type, page + 1)
    }
    handlePopState = (params) => {
        const lang = getQueryVariable('language')   
        this.handleNavClick(lang,this.state.page, false)     
        console.log('lang', lang)
        console.log('params', params)
        
    }
    componentDidMount() {
        const lang = getQueryVariable('language')        
        this.handleNavClick(lang)
        //  this.setState({lang})
        window.addEventListener('popstate', this.handlePopState)
    }
    componentWillUnmount () {
        window.removeEventListener('popstate', this.handlePopState)
    }
    render() {
        const { lang } = this.state
        return (<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div className="container">
                <Header onClick={this.handleNavClick} activeKey={lang}></Header>
                <Content loadMore={this.loadMore} error={this.state.error} cards={this.state.cards} loading={this.state.loading}>                   
                </Content>
                <Footer></Footer>
            </div>

        </div>)
    }
}
