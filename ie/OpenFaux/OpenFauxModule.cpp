// OpenFaux.cpp : Implementation of DLL Exports.


#include "stdafx.h"
#include "Resource.h"
#include "OpenFaux_i.h"
#include "OpenFauxModule.h"

using namespace ATL;

COpenFauxModule _AtlModule;
HINSTANCE GlobHInstance;

extern "C" BOOL WINAPI DllMain(HINSTANCE hInstance, DWORD dwReason, LPVOID lpReserved)
{
	GlobHInstance = hInstance;
	return _AtlModule.DllMain(dwReason, lpReserved); 
}

STDAPI DllCanUnloadNow(void)
{
	return _AtlModule.DllCanUnloadNow();
}

STDAPI DllGetClassObject(_In_ REFCLSID rclsid, _In_ REFIID riid, _Outptr_ LPVOID* ppv)
{
	return _AtlModule.DllGetClassObject(rclsid, riid, ppv);
}

STDAPI DllRegisterServer(void)
{
	ATL::AtlSetPerUserRegistration(true);

	HRESULT hr = _AtlModule.DllRegisterServer();
	return hr;
}

STDAPI DllUnregisterServer(void)
{
	ATL::AtlSetPerUserRegistration(true);

	HRESULT hr = _AtlModule.DllUnregisterServer();
	return hr;
}

STDAPI DllInstall(BOOL bInstall, _In_opt_  LPCWSTR pszCmdLine)
{
	ATL::AtlSetPerUserRegistration(true);

	HRESULT hr = E_FAIL;
	if (bInstall)
	{	
		hr = DllRegisterServer();
		if (FAILED(hr))
		{
			DllUnregisterServer();
		}
	}
	else
	{
		hr = DllUnregisterServer();
	}

	return hr;
}


