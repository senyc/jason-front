import apiKey from '@/src/lib/annotations/apiKey';
import { getAllApiKeys, revokeApiKey } from './actions';
import { useEffect, useState } from 'react';
import notifyFailure from '../../actions/notifyFailure';
import notifySuccess from '../../actions/notifySuccess';
import { ToastContainer } from 'react-toastify';

interface ApiKeyDisplay {
  hideKeyId?: string;
}

export default function ApiKeyDisplay({ hideKeyId }: ApiKeyDisplay) {
  const [apiKeyRevokeRequest, setApiKeyRevokeRequest] = useState({
    message: '',
    state: '',
  });
  const [apiKeys, setApiKeys] = useState<apiKey[] | never | undefined>();

  useEffect(() => {
    if (apiKeyRevokeRequest.state == 'failure') {
      notifyFailure(apiKeyRevokeRequest.message);
    } else if (apiKeyRevokeRequest.state == 'success') {
      notifySuccess(apiKeyRevokeRequest.message);
    }

    (async () => {
      setApiKeys(await getAllApiKeys());
    })();
  }, [apiKeyRevokeRequest]);

  return apiKeys && apiKeys.length == 0 ? (
    <p>
      You don't have any registered api keys, press <code>Generate</code> to add
      one.
    </p>
  ) : (
    apiKeys &&
      apiKeys.map((apiKey) => {
        if (hideKeyId && apiKey.id === hideKeyId) {
          return <> </>;
        }

        return (
          <li className='mt-3'>
            <div className='flex flex-col rounded-lg border-[.5px] border-gray-200 p-2'>
              <div className='flex flex-row items-center justify-between'>
                <h3 className='font-semibold'>{apiKey.label}</h3>
                <button
                  className='mb-[2px] h-10 min-w-10 rounded-lg border-[.5px] border-red-500 p-2 text-center text-sm font-semibold text-red-400 transition duration-75 ease-in hover:bg-red-400 hover:text-white'
                  onClick={async () =>
                    setApiKeyRevokeRequest(await revokeApiKey(apiKey.id))
                  }
                >
                  Revoke
                </button>
              </div>
              <p className='mb-3 mt-1'>
                Generated:{' '}
                {new Date(apiKey.creationDate).toLocaleDateString('en-US')}
              </p>
              <p>{apiKey.description}</p>
              <p className='mb-3 mt-1'>
                Expires:{' '}
                {new Date(apiKey.expiration).toLocaleDateString('en-US')}
              </p>
            </div>
            <ToastContainer
              position='bottom-left'
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              limit={3}
              rtl={false}
              pauseOnFocusLoss
              pauseOnHover
              closeButton={false}
            />
          </li>
        );
      })
  );
}
