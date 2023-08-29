// ======= Рефакторинг коду з використанням React-хуків ========
// import React, { Component } from 'react';

import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';
import fetchImages from '../services/fetchImages';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchImagesData = async () => {
      setIsLoading(true);
      const newImages = await fetchImages(query, page);
      setImages(prevImages => [...prevImages, ...newImages]);
      setIsLoading(false);
    };

    fetchImagesData();
  }, [query, page]);

  const handleSearchFormSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = image => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchFormSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <Button onClick={handleLoadMoreClick} />
      )}
      {selectedImage && (
        <Modal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
}


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
