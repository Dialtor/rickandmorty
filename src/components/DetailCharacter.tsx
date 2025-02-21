import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import GET_CHARACTERS from '../api/GET_CHARACTERS';
import { useQuery } from '@apollo/client';
import { Loader } from './Loader';
import { Character, CharactersData } from './Sidebar/components';
import { NotFound } from './NotFound';


const DetailCharacter = () => {

  const [characterData, setCharacterData] = useState<Character>();
  const { id: characterId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading, data } = useQuery<CharactersData>(GET_CHARACTERS, {
    variables: { id: Number(characterId) || null },
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isFav = searchParams.get('fav') === 'true';

  useEffect(() => {
    if (data?.characters?.results) {
      const character = data.characters.results.find(
        (character) => character.id === characterId
      );
      setCharacterData(character);
    }
  }, [data, characterId]);

  const handleBackClick = () => {
    navigate('/');
  };
  console.log(characterData)

  return (
    <>
      {loading ? (
        <Loader />
      ) : characterData ? (
        <div className="h-screen p-4 p-20">
          <button
            onClick={handleBackClick}
            className="mb-4 flex items-center text-[#1F2937] hover:text-blue-600"
          >
            <Icon icon="mdi:arrow-left" width="24" height="24" />
            <span className="ml-2">Back</span>
          </button>
          <div className='ml-6'>
            <div className='relative w-fit'>
              <img src={characterData?.image} alt={characterData?.name} className="w-24 h-24 rounded-full" />
              {isFav && (
                <div className='bg-white w-9 h-9 rounded-full flex items-center justify-center p-1 absolute bottom-0 right-0'>
                  <Icon
                    className="w-6 h-6"
                    icon="tdesign:heart-filled"
                    style={{ color: '#65D839' }}
                  />
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2 text-[#1F2937] mt-3">{characterData?.name}</h2>

            <div className="mt-9 mb-5 h-18 border-b border-gray-300">
              <p><strong className="font-medium text-lg text-black">Specie</strong></p>
              <p className="text-[#6B7280] text-lg">{characterData?.species}</p>
            </div>

            <div className="mt-6 mb-5 h-18 border-b border-gray-300">
              <p><strong className="font-medium text-lg text-black">Status</strong></p>
              <p className="mb-1 text-[#6B7280] text-lg">{characterData?.status}</p>
            </div>

            <div className="mt-6 mb-5 h-18 border-b border-gray-300">
              <p className="mb-1 text-[#6B7280] text-lg">
                <strong className="font-medium text-lg text-black">Occupation</strong>
              </p>
              <p className="mb-1 text-[#6B7280] text-lg">{''}</p>
            </div>
          </div>
        </div>
      ) : <NotFound/>}
    </>
  );
};

export default DetailCharacter;