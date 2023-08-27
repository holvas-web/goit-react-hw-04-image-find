// ======= Рефакторинг коду з використанням React-хуків ========
// import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { CustomLoader } from './Loader/Loader';
import { Modal } from './Modal/Modal'; 

const API_KEY = '38934998-3e855f71d85cefaf04a1d7456';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [prevQuery, setPrevQuery] = useState('');
  const [prevPage, setPrevPage] = useState(1);

  useEffect(() => {
    if (prevQuery !== query || prevPage !== page) {
      fetchImages();
    }
  }, [query, page, prevQuery, prevPage]);

  const fetchImages = () => {
    setIsLoading(true);

    axios
      .get(
        `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
      )
      .then(response => {
        setImages(prevImages => [...prevImages, ...response.data.hits]);
      })
      .finally(() => setIsLoading(false));
  };

  const handleSearchSubmit = newQuery => {
    if (query === newQuery) {
      alert(`You are already viewing results for ${newQuery}`);
      return;
    }

    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const toggleModal = (newLargeImageURL = '') => {
    setShowModal(prevShowModal => !prevShowModal);
    setLargeImageURL(newLargeImageURL);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={toggleModal} />
      {isLoading && <CustomLoader />}
      {images.length > 0 && !isLoading && 
        <Button onClick={handleLoadMore}>
          Load More
        </Button>
      }
      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={largeImageURL}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </div>
  );
};


//=========== Попередній код ===========
// const API_KEY = '38934998-3e855f71d85cefaf04a1d7456';
// const BASE_URL = 'https://pixabay.com/api/';
// const PER_PAGE = 12;

// export class App extends Component {
//   state = {
//     images: [],
//     query: '',
//     page: 1,
//     isLoading: false,
//     showModal: false,
//     largeImageURL: '',
//     prevQuery: '', // Додано для збереження попереднього пошукового запиту
//     prevPage: 1,  // Додано для збереження попередньої сторінки
//   };
  
//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
//       this.fetchImages();
//     }
//   }


//   // componentDidUpdate(prevProps, prevState) {
//   //   if (prevState.query !== this.state.query) {
//   //     this.fetchImages();
//   //   }
//   // }

//   fetchImages = () => {
//     const { query, page } = this.state;

//     this.setState({ isLoading: true });

//     axios
//       .get(
//         `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
//       )
//       .then(response => {
//         this.setState(prevState => ({
//           images: [...prevState.images, ...response.data.hits],
//           // page: prevState.page + 1,
//         }));
//       })
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   handleSearchSubmit = query => {
//     if (this.state.query === query) {
//       alert(`You are already viewing results for ${query}`);
//       return;
//     }

//     this.setState({ query, images: [], page: 1 });
//   };
  
//   toggleModal = (largeImageURL = '') => {
//     this.setState(
//       prevState => ({
//         showModal: !prevState.showModal,
//         largeImageURL,
//       }));
//     }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.toggleModal();
//     }
//   };

//   handleOverlayClick = event => {
//     if (event.target === event.currentTarget) {
//       this.toggleModal();
//     }
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { images, isLoading, showModal, largeImageURL } = this.state;

//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleSearchSubmit} />
//         <ImageGallery images={images} onImageClick={this.toggleModal} />
//         {isLoading && <CustomLoader />}
//         {images.length > 0 && !isLoading && 
//           <Button onClick={() => this.setState(prevState => ({ page: prevState.page + 1 }))}>
//             Load More
//           </Button>
//         }
//         {/* <Button onClick={this.fetchImages}>Load More</Button> */}
//         {showModal && (
//           <Modal onClose={this.toggleModal} largeImageURL={largeImageURL}>
//             <img src={largeImageURL} alt="" />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }
