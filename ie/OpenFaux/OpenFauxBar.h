#pragma once

#include "stdafx.h"
#include "resource.h"
#include "OpenFaux_i.h"
#include <shlguid.h>
#include <shlobj.h>

#include "OpenFauxToolbar.h"

class COpenFauxBar :
	public CComObjectRootEx<CComSingleThreadModel>,
	public CComCoClass<COpenFauxBar, &CLSID_OpenFauxBar>,
	public IDeskBand,
	public IObjectWithSiteImpl<COpenFauxBar>,
	public IDispatchImpl<IOpenFauxBar, &IID_IOpenFauxBar, &LIBID_OpenFauxLib, 1, 0>
{
public:
	COpenFauxBar();

	DECLARE_REGISTRY_RESOURCEID(IDR_OPENFAUX)

	BEGIN_CATEGORY_MAP(COpenFauxBar)
	END_CATEGORY_MAP()

	BEGIN_COM_MAP(COpenFauxBar)
		COM_INTERFACE_ENTRY(IOpenFauxBar)
		COM_INTERFACE_ENTRY(IObjectWithSite)
		COM_INTERFACE_ENTRY_IID(IID_IDeskBand, IDeskBand)
		COM_INTERFACE_ENTRY(IDispatch)
	END_COM_MAP()

	DECLARE_PROTECT_FINAL_CONSTRUCT()

// IDeskBand
public:
	STDMETHOD(GetBandInfo)(DWORD dwBandID, DWORD dwViewMode, DESKBANDINFO* pdbi);
	STDMETHOD(GetWindow)(HWND *);
	STDMETHOD(ContextSensitiveHelp)(BOOL) { return E_FAIL; }

// IObjectWithSite
public:
	STDMETHOD(SetSite)(IUnknown* pUnkSite);

// IDockingWindow
public:
	STDMETHOD(CloseDW)(unsigned long dwReserved);
	STDMETHOD(ResizeBorderDW)(const RECT* prcBorder, IUnknown* punkToolbarSite, BOOL fReserved);
	STDMETHOD(ShowDW)(BOOL fShow);

	COpenFauxToolbar& toolbar() { return m_toolbar; }
	WNDPROC rebarWinproc() { return m_rebarWinproc; }
protected:
	BOOL RegisterAndCreateWindow();

protected:
	DWORD m_dwBandID;
	HWND m_hWndParent;
	WNDPROC m_rebarWinproc;
	
	COpenFauxToolbar m_toolbar;
};

OBJECT_ENTRY_AUTO(__uuidof(OpenFauxBar), COpenFauxBar)
