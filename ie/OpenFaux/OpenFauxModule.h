// dllmain.h : Declaration of module class.

class COpenFauxModule : public ATL::CAtlDllModuleT< COpenFauxModule >
{
public :
	DECLARE_LIBID(LIBID_OpenFauxLib)
	DECLARE_REGISTRY_APPID_RESOURCEID(IDR_OPENFAUX, "{F16DB028-E696-462E-B1E7-A0BCEFD8570B}")
};

extern class COpenFauxModule _AtlModule;