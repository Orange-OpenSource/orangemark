Summary: A set of playing cards in SVG
Name: SVG-cards
Version: 2.0.1
Release: 1
Group: Games
License: LGPL
Source: http://david.bellot.free.fr/svg-cards/files/%{name}-%{version}.tar.gz
BuildRoot: /var/tmp/%{name}-rpmroot
Provides: SVG-cards
Packager: David Bellot <david.bellot@free.fr>
Vendor: David Bellot
Buildarch: noarch

%description
This is a set of playing cards made in pure SVG with all kings, queens, jacks, numbers, jokers and backs of cards. 
This set of SVG files is intended to be used in games, figures, illustrations and web sites. The kings, queens and 
jacks are based on the french representation, because I find them beautiful.

%prep
%setup

%build
echo "Ready to use"

%install
rm -rf $RPM_BUILD_ROOT
mkdir -p $RPM_BUILD_ROOT/usr/share/SVG-cards
mkdir -p $RPM_BUILD_ROOT/usr/share/doc/SVG-cards-%{version}
cp svg-cards-%{version}.svg $RPM_BUILD_ROOT/usr/share/SVG-cards
cp AUTHORS COPYING Changelog NEWS README SVG-cards.spec $RPM_BUILD_ROOT/usr/share/doc/SVG-cards-%{version}

%clean
rm -rf $RPM_BUILD_ROOT

%files
/usr/share/SVG-cards
%doc /usr/share/doc/SVG-cards-%{version}
