#pragma once

//struct png_t {unsigned char* data; unsigned int size, pos;};

#include <atlimage.h>

class CPngImage : public CImage
{
public:
	bool LoadFromResource(HINSTANCE hInst, UINT nIDRes);
};
