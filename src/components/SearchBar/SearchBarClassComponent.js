import React, {Component} from 'react';
//Styles
import {Wrapper, Content} from './SearchBar.styles'
//Image
import searchIcon from '../../images/search-icon.svg'
import PropTypes from 'prop-types'

class SearchBar extends Component {

    state = {value: ''}
    timeout = null

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.value !== prevState.value) {
            const {setSearchTemr} = this.props

            clearTimeout(this.timeout)

            this.timeout = setTimeout(() => {
                const {value} = this.state
                this.props.setSearchTerm(value)
            }, 500)
        }
    }


    render() {
        const {value} = this.state

        return (
            <Wrapper>
                <Content>
                    <img src={searchIcon} alt="search-icon"/>
                    <input
                        type="text"
                        placeholder={'Search Movie'}
                        onChange={(e) => this.setState({value: e.target.value})}
                        value={value}/>
                </Content>
            </Wrapper>
        );
    };
}


SearchBar.propTypes = {
    setSearchTerm: PropTypes.string
}

export default SearchBar;