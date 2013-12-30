#include "PngImage.h"

#define STBI_NO_STDIO
#define STBI_FAILURE_USERMSG 
#include "stb_image.c"

bool CPngImage::LoadFromResource(HINSTANCE hInst, UINT nIDRes)
{
	bool ret = false;

	HRSRC hRsrc = ::FindResource(hInst, MAKEINTRESOURCE(nIDRes), L"PNG"); // type
	if (!hRsrc)
		return ret;

	DWORD len = ::SizeofResource(hInst, hRsrc);
	HGLOBAL hResData = ::LoadResource(hInst, hRsrc);
	if (!hResData)
		return ret;

	HGLOBAL hGlobal = ::GlobalAlloc(GMEM_MOVEABLE | GMEM_NODISCARD, len);
	if (!hGlobal)
	{
		::FreeResource(hResData);
		return ret;
	}

	unsigned char* pDest = reinterpret_cast<unsigned char*> (::GlobalLock(hGlobal));
	unsigned char* pSrc = reinterpret_cast<unsigned char*> (::LockResource(hResData));
	
	if (!pSrc || !pDest)
	{
		::GlobalFree(hGlobal);
		::FreeResource(hResData);
		return ret;
	}

	::CopyMemory(pDest,pSrc,len);
	::FreeResource(hResData);
	::GlobalUnlock(hGlobal);

	int w, h, compCount;
	unsigned char* p = stbi_load_from_memory((unsigned char*)pDest, len, &w, &h, &compCount, 0);
	if(p != NULL)
	{
		if(Create(w, -h, 32, 0x01))
		{
			SetHasAlphaChannel(true);
			for(int y = 0; y < h; y++)
				memcpy(GetPixelAddress(0, y), p + w*compCount*y, w*compCount);
			ret = true;
		}

		stbi_image_free(p);
	}
	return ret;
}